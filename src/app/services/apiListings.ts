import api from "./axiosInstance";

export async function getListings() {
  const { data } = await api.get("/listings");

  return data;
}

export async function getMapListings() {
  const { data } = await api.get("/listings/map");

  return data;
}

export async function findListing(listingId: string) {
  const { data } = await api.get(`/listings/${listingId}`);

  return data;
}

export async function createListing(listingData: {}) {
  const { data } = await api.post("/listings/", listingData);

  return data;
}

export async function updateListing(update: {}) {
  const { data } = await api.patch("/listings/", update);

  return data;
}

export async function deleteListing(listingId: string) {
  const { data } = await api.patch(`/listings/${listingId}`);

  return data;
}

export async function markListingAsAvailable(listingId: string) {
  const { data } = await api.patch(`/listings/${listingId}`);

  return data;
}

export async function markListingAsInactive(listingId: string) {
  const { data } = await api.patch(`/listings/${listingId}`);

  return data;
}
