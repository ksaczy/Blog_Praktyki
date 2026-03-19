import { z } from 'zod';


export const droneSchema = z.object({
    model_name: z.string().min(5, "Nazwa modelu musi mieć min. 5 znaków"),
    serial_number: z.string().regex(/^SN-[A-Z]{4}-\d{3}$/, "Format: SN-AAAA-999"),
    specs: z.object({
        max_speed: z.number()
            .min(10, "Min. 10 km/h")
            .max(180, "Max. 180 km/h"),
        // @ts-ignore
        battery_type: z.enum(["Li-Po", "Li-Ion", "Solid State"] as const),
        sensors: z.array(z.string().min(1, "Nazwa sensora nie może być pusta"))
            .min(1, "Dodaj przynajmniej jeden sensor"),
    }),
    safety_features: z.object({
        return_home: z.boolean().default(false),
        emergency_parachute: z.boolean().default(false),
        parachute_test_date: z.string().optional(),
    }).refine((data) => {
        if (data.emergency_parachute && !data.parachute_test_date) {
            return false;
        }
        return true;
    }, {
        message: "Data przeglądu jest wymagana, gdy dron posiada spadochron",
        path: ["safety_features", "parachute_test_date"],
    }),
});

export type DroneFormData = z.infer<typeof droneSchema>;