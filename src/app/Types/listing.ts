export interface Location {
  area: string;
  university: string;
  address?: string;
  coordinates: {
    type: "Point";
    coordinates: [number, number];
  };
}

export interface Pricing {
  monthlyPrice?: number;
  priceRange?: {
    min: number;
    max: number;
  };
}

export type RoomTypes =
  | "1-in-a-room"
  | "2-in-a-room"
  | "3-in-a-room"
  | "4-in-a-room"
  | "More-than-4"
  | "Exclusive";

export interface Contact {
  phone: string;
  email?: string;
  website?: string;
}

// Listing Interface
export interface ListingDocument {
  id: string;
  title: string;
  description: string;
  listingType: "hostel" | "private";
  images: string[];
  amenities: string[];
  location: Location;
  pricing: Pricing;
  roomTypes?: RoomTypes[];
  availabilityStatus: "available" | "inactive";
  contact: Contact;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

//Types used in API functions

export interface ListingFilters {
  listingType?: "hostel" | "private";
  availabilityStatus?: "available" | "inactive";
  price?: number;
  search?: string;
}

export type UpdateListingType = Partial<ListingDocument>;
