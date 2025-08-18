import { z } from "zod";

export const loginSchema = z.object({
  phone: z
    .string()
    .regex(/^09\d{9}$/, "Phone must be a valid 11-digit Iranian number"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
