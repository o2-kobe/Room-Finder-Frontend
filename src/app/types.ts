export type ListingType = 'hostel' | 'private';

export type AvailabilityStatus = 'available' | 'recently-updated' | 'inactive';

export interface Location {
  lat: number;
  lng: number;
  address: string;
  area: string;
  university: string;
  distance?: string;
}

export interface RoomType {
  id: string;
  type: string;
  price?: number;
  availability: AvailabilityStatus;
  capacity?: number;
}

export interface Listing {
  id: string;
  type: ListingType;
  title: string;
  description: string;
  location: Location;
  availability: AvailabilityStatus;
  lastUpdated: Date;
  images: string[];
  contact: {
    name: string;
    phone: string;
    email?: string;
  };
  price?: number;
  roomTypes?: RoomType[]; // For hostels
}

export interface FilterState {
  category: ListingType | 'all';
  availability: AvailabilityStatus | 'all';
  searchQuery: string;
}
