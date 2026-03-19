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

    const { append, remove, fields } = useFieldArray({control, name: "sensors"})//Tak jak mówiłem, to raz się podkreśla na czerwono, a raz nie... (napisanie tego komentarza naprawiło podkreślenie)

    const onSubmit: SubmitHandler<Drone> = async (data) => {
        reset();
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log(data);
    };

    const hasParachute = watch("safetyFeatures.emergencyParachute");

    useEffect(() => {//To nie jest najpiękniejsze rozwiązanie, ale dodanie "" do default values nie pomaga i nie mam lepszego pomysłu
        if(fields.length===0)append("")
    }, [append, fields]);

    return(
        <div className="add-drone">
            <h1>Add Drone</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="model-name">Drone model:</label>
                <input id="model-name" {...register("modelName")} type="text" placeholder="model" />
                {errors.modelName && <p className="error">{errors.modelName.message}</p>}

                <label htmlFor="SN">Drone serial number:</label>
                <input id="SN" {...register("serialNumber")} type="text" placeholder="SN-XXXX-999" />
                {errors.serialNumber && <p className="error">{errors.serialNumber?.message}</p>}

                <h3>Specs</h3>
                <label htmlFor="max-speed">Drone max speed:</label>
                <input id="max-speed" {...register("specs.maxSpeed")} type="number" placeholder="max speed" />
                {errors.specs?.maxSpeed && <p className="error">{errors.specs.maxSpeed.message}</p>}

                <label htmlFor="battery-type">Type of battery:</label>
                <select id="battery-type" {...register("specs.batteryType")}>
                    <option>Li-Po</option>
                    <option>Li-Ion</option>
                    <option>Solid State</option>
                </select>

                <label htmlFor="sensors">Sensors:</label>
                {fields.map((field, i) => (
                    <div key={field.id}>
                        <div className="sensor-field">
                            <input id={"sensors"+i} {...register(`sensors.${i}`)} type="text" placeholder="sensor name" aria-label={"Sensor name "+i}/>
                            {fields.length>1 && <button type="button" onClick={()=>remove(i)}>delete</button>}
                        </div>
                        {errors.sensors?.[i] && <p className="error">{errors.sensors?.[i]?.message}</p>}
                    </div>
                ))}
                <button type="button" onClick={()=>append("")}>Add sensor</button>
                {errors.sensors?.root &&  <p className="error">{errors.sensors.root.message}</p>}

                <h3>Safety Features</h3>
                <div className="checkbox">
                    <input id="return-home" {...register("safetyFeatures.returnHome")} type="checkbox" />
                    <label htmlFor="return-home">Return home</label>
                </div>

                <div className="checkbox">
                    <input id="emergency-parachute" {...register("safetyFeatures.emergencyParachute")} type="checkbox" />
                    <label htmlFor="emergency-parachute">Emergency parachute</label>
                </div>
                {hasParachute && (
                    <div className="date">
                        <label htmlFor="test-date">Date of last parachute test:</label>
                        <input id="test-date" { ...register("safetyFeatures.parachuteTestDate", { shouldUnregister: true })} type="date" />
                        {errors.safetyFeatures?.parachuteTestDate && <p className="error">{errors.safetyFeatures.parachuteTestDate.message}</p>}
                    </div>
                )}
                <button disabled={isSubmitting}>{isSubmitting? "Loading..." : "Submit"}</button>
            </form>
        </div>
    )
}

export default AddDrone;