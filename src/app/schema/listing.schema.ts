import { z } from "zod";
const coordinatesSchema = z.object({
  type: z.literal("Point"),
  coordinates: z.array(z.number()).length(2, "Coordinates must be [lng, lat]"),
});

const locationSchema = z.object({
  area: z
    .string()
    .min(2, "Area must be at least 2 characters")
    .max(20, "Area must not exceed 20 characters"),
  university: z
    .string()
    .min(10, "University name must be at least 10 characters"),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .optional(),
  coordinates: coordinatesSchema,
});

const pricingSchema = z.object({
  monthlyPrice: z.number().positive().optional(),
  priceRange: z
    .object({
      min: z.number().positive(),
      max: z.number().positive(),
    })
    .optional(),
});

const contactSchema = z.object({
  phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
});

export const listingSchema = z.object({
  title: z
    .string()
    .min(10, "Title must be at least 10 characters")
    .max(100, "Title must not exceed 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(200, "Description must not exceed 200 characters"),
  listingType: z.enum(["hostel", "private"]),
  images: z
    .array(z.instanceof(File))
    .max(3, "You can upload a maximum of 3 images")
    .optional(),
  amenities: z.array(z.string()).optional(),
  location: locationSchema,
  pricing: pricingSchema,
  roomTypes: z
    .array(
      z.enum([
        "1-in-a-room",
        "2-in-a-room",
        "3-in-a-room",
        "4-in-a-room",
        "More-than-4",
        "Exclusive",
      ]),
    )
    .min(1, "At least one room must be selected")
    .optional(),
  availabilityStatus: z.enum(["available", "inactive"]).default("available"),
  contact: contactSchema,
});

export type ListingFormData = z.input<typeof listingSchema>;
