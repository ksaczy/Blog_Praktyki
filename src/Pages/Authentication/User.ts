import { z } from "zod";
//dodać tablicę błędów

export const UserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),//dodać jakiegoś regexa do sprawdzania hasła
})

export type User = z.infer<typeof UserSchema>;
