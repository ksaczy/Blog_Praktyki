import { Drone, DroneSchema } from "../Functionality/Drone"
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react'
import './AddDrone.scss';


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
            sensors: [""],
            safetyFeatures: {
                returnHome: false,
                emergencyParachute: false,
                parachuteTestDate: null
            }
        },
    });

    const { append, remove, fields } = useFieldArray({control, name: "sensors" as const})

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
        <div className="add-drone">
            <h1>Add Drone</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Drone model:</label>
                <input {...register("modelName")} type="text" placeholder="model" />
                {errors.modelName && <p className="error">{errors.modelName.message}</p>}

                <label>Drone serial number:</label>
                <input {...register("serialNumber")} type="text" placeholder="SN-XXXX-999" />
                {errors.serialNumber && <p className="error">{errors.serialNumber?.message}</p>}

                <h2>Specs</h2>
                <label>Drone max speed:</label>
                <input {...register("specs.maxSpeed")} type="number" placeholder="max speed" />
                {errors.specs?.maxSpeed && <p className="error">{errors.specs.maxSpeed.message}</p>}

                <label>Type of battery:</label>
                <select {...register("specs.batteryType")}>
                    <option>Li-Po</option>
                    <option>Li-Ion</option>
                    <option>Solid State</option>
                </select>

                <label>Sensors:</label>
                {fields.map((field, i) => (
                    <div key={field.id}>
                        <div className="sensor-field">
                            <input {...register(`sensors.${i}`)} type="text"/>
                            {fields.length>1 && <button type="button" onClick={()=>remove(i)}>delete</button>}
                        </div>
                        {errors.sensors?.[i] && <p className="error">{errors.sensors?.[i]?.message}</p>}
                    </div>
                ))}
                <button type="button" onClick={()=>append("")}>Add sensor</button>
                {errors.sensors?.root &&  <p className="error">{errors.sensors.root.message}</p>}

                <h2>Safety Features</h2>
                <div className="checkbox">
                    <label htmlFor="return-home">Return home</label>
                    <input id="return-home" {...register("safetyFeatures.returnHome")} type="checkbox" />
                </div>

                <div className="checkbox">
                    <label htmlFor="emergency-parachute">Emergency parachute</label>
                    <input id="emergency-parachute" {...register("safetyFeatures.emergencyParachute")} type="checkbox" />
                </div>
                {hasParachute && (
                    <div className="date">
                        <label>Date of last parachute test:</label>
                        <input {...register("safetyFeatures.parachuteTestDate", { shouldUnregister: true })} type="date" />
                        {errors.safetyFeatures?.parachuteTestDate && <p className="error">{errors.safetyFeatures.parachuteTestDate.message}</p>}
                    </div>
                )}
                <button disabled={isSubmitting}>{isSubmitting? "Loading..." : "Submit"}</button>
            </form>
        </div>
    )
}

export default AddDrone;