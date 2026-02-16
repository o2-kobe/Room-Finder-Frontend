import { z } from "zod";

export const userSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 5 characters"),
    email: z.string().email("Email must be a valid format").or(z.literal("")),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(64, "Password cannot exceed 64 characters"),
    passwordConfirm: z.string(),
    role: z.enum(["landlord", "hostelManager", "Guest"], {
      message: "Please select a valid role",
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

export type UserFormData = z.infer<typeof userSchema>;
