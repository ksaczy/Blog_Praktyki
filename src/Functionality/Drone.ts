import { z } from "zod";

export const DroneSchema = z.object({
    modelName: z.string().min(5),
    serialNumber: z.string().regex(/^SN-[a-zA-Z]{4}-[0-9]{3}$/),
    specs: z.object({
        maxSpeed: z.coerce.number().min(10).max(180),
        batteryType: z.enum(["Li-Po", "Li-Ion", "Solid State"] as const)
    }),
    sensors: z.array(z.string().min(1)).min(1),
    safetyFeatures: z.object({
        returnHome: z.boolean(),
        emergencyParachute: z.boolean(),
        parachuteTestDate: z.coerce.date().nullable().optional(),
    }).refine( data=>{
            if(data.emergencyParachute)return !!data.parachuteTestDate;
            return true;
    }, {
        message: "Date of last test is required with parachute checked",
        path: ["parachuteTestDate"]
    })
})

export type Drone = z.infer<typeof DroneSchema>;

