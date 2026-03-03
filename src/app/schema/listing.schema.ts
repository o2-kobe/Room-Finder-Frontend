import { z } from "zod";

const coordinatesSchema = z.object({
  type: z.literal("Point"),
  coordinates: z.array(z.number()).length(2),
});

const locationSchema = z.object({
  area: z.string().min(2).max(20),
  university: z.string().min(10),
  address: z.string().min(5).optional(),
  coordinates: coordinatesSchema,
});

// 1. Make baseSchema a real z.object
const baseSchema = z.object({
  title: z.string().min(10).max(100),
  description: z.string().min(10).max(200),
  images: z.array(z.instanceof(File)).max(3).optional(),
  amenities: z.array(z.string().min(2)).max(6),
  location: locationSchema,
  availabilityStatus: z.enum(["available", "inactive"]),
  contact: z.object({
    phone: z.string().regex(/^\d{10}$/),
  }),
});

// 3. Use .extend() instead of spreading plain objects
export const hostelSchema = baseSchema.extend({
  listingType: z.literal("hostel"),
  pricing: z.object({
    priceRange: z.object({
      min: z.number().positive(),
      max: z.number().positive(),
    }),
  }),
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
    .min(1),
  // Overwriting the contact object is perfectly valid with .extend()
  contact: z.object({
    phone: z.string().regex(/^\d{10}$/),
    email: z.string().email().optional(),
    website: z.string().url().optional().or(z.literal("")),
  }),
});

export const privateSchema = baseSchema.extend({
  listingType: z.literal("private"),
  pricing: z.object({
    monthlyPrice: z.number().positive(),
  }),
});

export type HostelFormData = z.infer<typeof hostelSchema>;
export type PrivateFormData = z.infer<typeof privateSchema>;

export const listingSchema = z.discriminatedUnion("listingType", [
  hostelSchema,
  privateSchema,
]);

export type CreateListingFormData = HostelFormData | PrivateFormData;

// 4. Because we removed .default(), you no longer need the Omit hack!
// z.infer will output strict, perfect types.
export type ListingFormData = z.infer<typeof listingSchema>;
