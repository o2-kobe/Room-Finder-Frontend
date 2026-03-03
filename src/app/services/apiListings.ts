import type { CreateListingFormData } from "../schema/listing.schema";
import type { ListingFilters } from "../Types/listing";
import api from "./axiosInstance";

// Find listings for home and explore pages
export async function getListings(
  filters: ListingFilters,
  cursor?: string,
  limit: number = 15,
) {
  const { data } = await api.get("/listings", {
    params: {
      ...filters,
      cursor,
      limit,
    },
  });

  return data;
}

// Find listings for map
export async function getMapListings(filters: ListingFilters) {
  const { data } = await api.get("/listings/map", {
    params: filters,
  });

  return data;
}

//Find single listing
export async function findListing(listingId: string) {
  const { data } = await api.get(`/listings/${listingId}`);

  return data;
}

export async function createListing(listingData: CreateListingFormData) {
  const { data } = await api.post("/listings/", listingData);

  return data;
}

export async function updateListing(listingId: string, update: {}) {
  const { data } = await api.patch(`/listings/${listingId}`, update);

  return data;
}

export async function deleteListing(listingId: string) {
  const { data } = await api.patch(`/listings/${listingId}`);

  return data;
}

export async function getPropertiesOfOwner() {
  const { data } = await api.get("/listings-propertyOwner");

  return data;
}

export async function markListingAsAvailable(listingId: string) {
  const { data } = await api.patch(`/listings/markAvailable/${listingId}`);

  return data;
}

export async function markListingAsInactive(listingId: string) {
  const { data } = await api.patch(`/listings/markInactive/${listingId}`);

  return data;
}

export async function updateListingPrice({
  listingId,
  newPrice,
}: {
  listingId: string;
  newPrice: number;
}) {
  const { data } = await api.patch(`/updateListingPrice/${listingId}`, {
    price: newPrice,
  });

  return data;
}
