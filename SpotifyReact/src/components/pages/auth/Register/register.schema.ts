import { z } from "zod";

export const step1Schema = z.object({
  email: z.string().email("Некоректний email"),
});

export const step2Schema = z.object({
  password: z
    .string()
    .min(8, "Мінімум 8 символів")
    .regex(/[A-Z]/, "Потрібна велика літера")
    .regex(/[a-z]/, "Потрібна мала літера")
    .regex(/\d/, "Потрібна цифра"),
});

export const step3Schema = z.object({
  username: z.string().min(3, "Мінімум 3 символи"),
  birthDate: z
    .string()
    .regex(/^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/, "Формат dd.mm.yyyy"),
});

export const fullRegisterSchema = step1Schema.merge(step2Schema).merge(step3Schema);
export type FullRegister = z.infer<typeof fullRegisterSchema>;