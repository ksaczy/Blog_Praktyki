import { z } from "zod";

export const errorMessages = {
    modelName: "String has to be at least 5 characters",
    serialNumber: "Serial number has to follow pattern: SN-ABCD-123",
    maxSpeed: "Speed must be between 10 and 180 km/h",
    batteryType: "Invalid battery type. Choose Li-Po, Li-Ion, or Solid State",
    sensors: "At least one sensor is required",
    sensorName: "Sensor name cannot be empty",
    parachuteTestDate: "Date of last test is required with parachute checked",
};

export const DroneSchema = z.object({
    modelName: z.string().min(5, errorMessages.modelName),
    serialNumber: z.string().regex(/^SN-[a-zA-Z]{4}-[0-9]{3}$/, errorMessages.serialNumber),
    specs: z.object({
        maxSpeed: z.coerce.number().min(10, errorMessages.maxSpeed).max(180, errorMessages.maxSpeed),
        batteryType: z.enum(["Li-Po", "Li-Ion", "Solid State"] as const, {
            errorMap: () => ({ message: errorMessages.batteryType })
        })
    }),
    sensors: z.array(z.string().min(1, errorMessages.sensorName)).min(1, errorMessages.sensors),
    safetyFeatures: z.object({
        returnHome: z.boolean(),
        emergencyParachute: z.boolean(),
        parachuteTestDate: z.coerce.date().nullable().optional(),
    }).refine(data => {
        if (data.emergencyParachute) return !!data.parachuteTestDate;
        return true;
    }, {
        message: errorMessages.parachuteTestDate,
        path: ["parachuteTestDate"]
    })
});

export type Drone = z.infer<typeof DroneSchema>;