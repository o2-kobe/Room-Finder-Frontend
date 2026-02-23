import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createListing,
  deleteListing,
  findListing,
  getListings,
  getMapListings,
  updateListing,
} from "../services/apiListings";
import { type ListingFilters } from "../Types/listing";

export function useListings(filters: ListingFilters) {
  return useInfiniteQuery({
    queryKey: ["listings", filters],

    queryFn: ({ pageParam }) => getListings(filters, pageParam),

    initialPageParam: undefined as string | undefined,

    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: 1000 * 60 * 30,
  });
}

export function useMapListings(filters: ListingFilters) {
  return useQuery({
    queryKey: ["map-listings", filters],
    queryFn: () => getMapListings(filters),
    staleTime: 1000 * 60 * 30,
  });
}

export function useListing(listingId: string) {
  return useQuery({
    queryKey: ["listing", listingId],
    queryFn: () => findListing(listingId),
    enabled: !!listingId,
    staleTime: 1000 * 60 * 30,
  });
}

export function useCreateListing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createListing,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listings"] });
      queryClient.invalidateQueries({ queryKey: ["map-listings"] });
    },
  });
}

export function useUpdateListing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateListing,

    onSuccess: (_, variables: any) => {
      queryClient.invalidateQueries({ queryKey: ["listings"] });
      queryClient.invalidateQueries({ queryKey: ["map-listings"] });
      queryClient.invalidateQueries({ queryKey: ["listing", variables.id] });
    },
  });
}

export function useDeleteListing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteListing,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listings"] });
      queryClient.invalidateQueries({ queryKey: ["map-listings"] });
    },
  });
}
