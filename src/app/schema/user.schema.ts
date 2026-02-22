import { z } from "zod";

export const signupSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 5 characters"),
    email: z.string().email("Email must be a valid format"),
    password: z
      .string()
      .min(12, "Password must be at least 12 characters")
      .max(72, "Password cannot exceed 72 characters"),
    passwordConfirm: z.string(),
    role: z.enum(["landlord", "hostelManager", "student"], {
      message: "Please select a valid role",
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

export const loginSchema = z.object({
  email: z.string().email("Email must be a valid format"),
  password: z
    .string()
    .min(12, "Password must be at least 12 characters")
    .max(72, "Password cannot exceed 72 characters"),
});

export type SignupFormData = z.infer<typeof signupSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
