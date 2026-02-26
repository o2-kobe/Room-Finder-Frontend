import { z } from "zod";
const coordinatesSchema = z.object({
  type: z.literal("Point"),
  coordinates: z.array(z.number()).length(2, "Coordinates must be [lng, lat]"),
});

const locationSchema = z.object({
  area: z.string().min(2),
  university: z.string().min(10),
  address: z.string().min(5).optional(),
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
  title: z.string().min(10).max(100),
  description: z.string().min(10).max(200),
  listingType: z.enum(["hostel", "private"]),
  images: z.array(z.string().url()).optional(),
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
    .optional(),
  availabilityStatus: z.enum(["available", "inactive"]).default("available"),
  contact: contactSchema,
});

export type ListingFormData = z.infer<typeof listingSchema>;
