import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
});

export const RegisterSchema = LoginSchema.extend({
    password: z.string().min(6, "Password must be at least 6 characters"),
    passwordRepeat: z.string(),
}).refine((data) => data.password === data.passwordRepeat, {
    message: "Passwords don't match",
    path: ["passwordRepeat"],
});

export type LoginData = z.infer<typeof LoginSchema>;
export type RegisterData = z.infer<typeof RegisterSchema>;