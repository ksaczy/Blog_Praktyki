import React, { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { droneSchema, DroneFormData } from './schema';
import './DroneForm.scss';
import { SubmitHandler } from 'react-hook-form';

const DroneForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        control,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<DroneFormData>({
        resolver: zodResolver(droneSchema),
        defaultValues: {
            specs: { sensors: [""] },
            safety_features: { emergency_parachute: false }
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "specs.sensors"
    });

    const hasParachute = watch("safety_features.emergency_parachute");

    const onSubmit: SubmitHandler<DroneFormData> = async (data) => {
        setIsSubmitting(true);

        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log("Zapisano drona:", JSON.stringify(data, null, 2));

        setIsSubmitting(false);
        reset();
        alert("Dron został pomyślnie dodany do floty!");
    };

    return (
        <div className="form-container">
            <h2>Dodaj nowego drona</h2>
            <form onSubmit={handleSubmit(onSubmit)}>

                {/* Model & Serial */}
                <div className="form-group">
                    <label>Nazwa modelu</label>
                    <input {...register("model_name")} placeholder="np. DJI Matrice 300" />
                    {errors.model_name && <span className="error">{errors.model_name.message}</span>}
                </div>

                <div className="form-group">
                    <label>Numer seryjny (SN-XXXX-999)</label>
                    <input {...register("serial_number")} placeholder="SN-ABCD-123" />
                    {errors.serial_number && <span className="error">{errors.serial_number.message}</span>}
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Maks. prędkość (km/h)</label>
                        <input type="number" {...register("specs.max_speed", { valueAsNumber: true })} />
                        {errors.specs?.max_speed && <span className="error">{errors.specs.max_speed.message}</span>}
                    </div>

                    <div className="form-group">
                        <label>Typ baterii</label>
                        <select {...register("specs.battery_type")}>
                            <option value="Li-Po">Li-Po</option>
                            <option value="Li-Ion">Li-Ion</option>
                            <option value="Solid State">Solid State</option>
                        </select>
                    </div>
                </div>

                <div className="sensors-section">
                    <label>Czujniki i wyposażenie</label>
                    {fields.map((field, index) => (
                        <div key={field.id} className="sensor-input">
                            <input {...register(`specs.sensors.${index}` as const)} />
                            <button type="button" onClick={() => remove(index)}>Usuń</button>
                            {errors.specs?.sensors?.[index] && (
                                <span className="error">{errors.specs.sensors[index]?.message}</span>
                            )}
                        </div>
                    ))}
                    <button type="button" className="btn-add" onClick={() => append("")}>
                        + Dodaj sensor
                    </button>
                    {errors.specs?.sensors?.root && <span className="error">{errors.specs.sensors.root.message}</span>}
                </div>

                <div className="safety-section">
                    <h3>Systemy bezpieczeństwa</h3>
                    <label className="checkbox-label">
                        <input type="checkbox" {...register("safety_features.return_home")} />
                        Powrót do domu (RTH)
                    </label>

                    <label className="checkbox-label">
                        <input type="checkbox" {...register("safety_features.emergency_parachute")} />
                        Spadochron ratunkowy
                    </label>

                    {hasParachute && (
                        <div className="form-group conditional-field">
                            <label>Data ostatniego przeglądu spadochronu</label>
                            <input type="date" {...register("safety_features.parachute_test_date")} />
                            {errors.safety_features?.parachute_test_date && (
                                <span className="error">{errors.safety_features.parachute_test_date.message}</span>
                            )}
                        </div>
                    )}
                </div>

                <button type="submit" className="btn-submit" disabled={isSubmitting}>
                    {isSubmitting ? <div className="loader"></div> : "Zapisz jednostkę"}
                </button>
            </form>
        </div>
    );
};

export default DroneForm;