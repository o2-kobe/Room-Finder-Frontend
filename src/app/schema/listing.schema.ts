import { z } from "zod";

export const listingSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  university: z.string().min(1, "University name is required"),
  area: z.string().min(3, "Area must be at least 3 characters"),
  address: z.string().min(3, "Address must be at least 3 characters"),
  monthlyRent: z.number().min(0, "Monthly rent cannot be negative").optional(), // keep as string for flexibility
  availabilityStatus: z.enum(["available", "recently-updated", "inactive"], {
    message: "Please select a valid availability status",
  }),
  contactName: z.string().min(5, "Contact name must be at least 5 characters"),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  email: z.string().email("Email must be a valid format").or(z.literal("")),
  images: z.any().optional(),
});

export type ListingFormData = z.infer<typeof listingSchema>;
