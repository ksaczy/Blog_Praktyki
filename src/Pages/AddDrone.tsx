import { Drone, DroneSchema } from "../Functionality/Drone"
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react'
import './AddDrone.scss';
import {InputField} from "./InputField";

export const labels = {
    modelName: "Drone model:",
    serialNumber: "Drone serial number:",
    maxSpeed: "Drone max speed:",
    batteryType: "Type of battery:",
    sensors: "Sensors:",
    returnHome: "Return home",
    emergencyParachute: "Emergency parachute",
    parachuteTestDate: "Date of last parachute test:",
}

const AddDrone = () => {

    const {register, handleSubmit, watch, control, reset, formState: { errors, isSubmitting } } = useForm<Drone>({
        resolver: zodResolver(DroneSchema),
        mode: "onChange",
        defaultValues: {
            modelName: "",
            serialNumber: "",
            specs: {
                maxSpeed: 10,
                batteryType: "Li-Po"
            },
            sensors: [],
            safetyFeatures: {
                returnHome: false,
                emergencyParachute: false,
                parachuteTestDate: null
            }
        },
    });

    const { append, remove, fields } = useFieldArray({control, name: "sensors"})

    const onSubmit: SubmitHandler<Drone> = async (data) => {
        reset();
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log(data);
    };

    const hasParachute = watch("safetyFeatures.emergencyParachute");

    useEffect(() => {
        if(fields.length===0)append("")
    }, [append, fields]);



    return(
        <div className="form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Add Drone</h1>
                <InputField
                    name="modelName"
                    label={labels.modelName}
                    error={errors.modelName}
                    register={register("modelName")}
                    placeholder="model"
                    type="text"
                />

                <InputField
                    name="serialNumber"
                    label={labels.serialNumber}
                    error={errors.serialNumber}
                    register={register("serialNumber")}
                    placeholder="SN-XXXX-999"
                    type="text"
                />

                <h3>Specs</h3>
                <InputField
                    name="maxSpeed"
                    label={labels.maxSpeed}
                    error={errors.specs?.maxSpeed}
                    register={register("specs.maxSpeed")}
                    placeholder="max speed"
                    type="number"
                />

                <label htmlFor="battery-type">{labels.batteryType}</label>
                <select id="battery-type" {...register("specs.batteryType")}>
                    <option>Li-Po</option>
                    <option>Li-Ion</option>
                    <option>Solid State</option>
                </select>
                {errors.specs?.batteryType && <p className="error">{errors.specs.batteryType.message}</p>}


                <label htmlFor="sensors">{labels.sensors}</label>
                {fields.map((field, i) => (
                    <div key={field.id}>
                        <div className="sensor-field">
                            <InputField
                                name={"sensors"+i}
                                error={errors.sensors?.[i]}
                                register={register(`sensors.${i}`)}
                                placeholder="sensor name"
                                type="text"
                                aria-label={"Sensor name "+i}
                            />
                            {fields.length>1 && <button type="button" onClick={()=>remove(i)}>delete</button>}
                        </div>
                    </div>
                ))}
                <button type="button" onClick={()=>append("")}>Add sensor</button>
                {errors.sensors?.root &&  <p className="error">{errors.sensors.root.message}</p>}

                <h3>Safety Features</h3>
                <div className="checkbox">
                    <input id="return-home" {...register("safetyFeatures.returnHome")} type="checkbox" />
                    <label htmlFor="return-home">{labels.returnHome}</label>
                </div>

                <div className="checkbox">
                    <input id="emergency-parachute" {...register("safetyFeatures.emergencyParachute")} type="checkbox" />
                    <label htmlFor="emergency-parachute">{labels.emergencyParachute}</label>
                </div>
                {hasParachute && (
                    <InputField
                        name="TestDate"
                        label={labels.parachuteTestDate}
                        error={errors.safetyFeatures?.parachuteTestDate}
                        register={register("safetyFeatures.parachuteTestDate", { shouldUnregister: true })}
                        type="date"
                    />

                )}
                <button disabled={isSubmitting}>{isSubmitting? "Loading..." : "Submit"}</button>
            </form>
        </div>
    )
}

export default AddDrone;