import { z } from "zod";

const coordinatesSchema = z.object({
  type: z.literal("Point"),
  coordinates: z.array(z.number()).length(2),
});

const locationSchema = z.object({
  area: z
    .string()
    .min(2, "Area must be at least 2 characters")
    .max(20, "Area cannot exceed 20 characters"),
  university: z.string().min(10, "University must be at least 10 characters"),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .optional(),
  coordinates: coordinatesSchema,
});

const baseSchema = z.object({
  title: z
    .string()
    .min(10, "Title must be at least 10 characters")
    .max(100, "Title cannot exceed 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(200, "Description cannot exceed 200 characters"),
  images: z
    .array(z.instanceof(File), "At least one image should be provided")
    .max(3, "Images cannot be more than 3")
    .optional(),
  amenities: z.array(z.string().min(2)).max(6),
  location: locationSchema,
  availabilityStatus: z.enum(["available", "inactive"]),
  contact: z.object({
    phone: z.string().regex(/^\d{10}$/, "Phone number be 10 digits"),
  }),
});

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
    .min(1, "Select at least one room type"),
  contact: z.object({
    phone: z.string().regex(/^\d{10}$/, "Phone number be 10 digits"),
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

export type ListingFormData = z.infer<typeof listingSchema>;
