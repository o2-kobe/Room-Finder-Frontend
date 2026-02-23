// import { useState } from "react";
import { useNavigate } from "react-router";
import { Loader, MapIcon } from "lucide-react";
import { ListingCard } from "../components/ListingCard";
// import { FilterBar } from "../components/FilterBar";
import { BottomNavigation } from "../components/BottomNavigation";
import { DesktopNavigation } from "../components/DesktopNavigation";
// import { type FilterState } from "../types";
import MobileHeader from "../components/MobileHeader";
import { useListings } from "../hooks/useListings";
import InfiniteScrollContainer from "../components/InfiniteScrollContainer";
import Loading from "../components/Loading";

export default function ExplorePage() {
  const navigate = useNavigate();
  // const [filters, setFilters] = useState<FilterState>({
  //   category: "all",
  //   availability: "all",
  //   searchQuery: "",
  // });
  const filters = {};

  // const filteredListings = mockListings.filter((listing) => {
  //   const matchesCategory =
  //     filters.category === "all" || listing.type === filters.category;
  //   const matchesAvailability =
  //     filters.availability === "all" ||
  //     listing.availability === filters.availability;
  //   const matchesSearch =
  //     filters.searchQuery === "" ||
  //     listing.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
  //     listing.location.area
  //       .toLowerCase()
  //       .includes(filters.searchQuery.toLowerCase()) ||
  //     listing.location.university
  //       .toLowerCase()
  //       .includes(filters.searchQuery.toLowerCase());
  //   return matchesCategory && matchesAvailability && matchesSearch;
  // });

  // const filters = useMemo(
  //   () => ({
  //     listingType: "hostel",
  //     availabilityStatus: "available",
  //     search: "",
  //   }),
  //   []
  // );

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useListings(filters);

  const listings = data?.pages.flatMap((page) => page.data) ?? [];

  if (isLoading) return <Loading />;
  if (isError) return <div>Something went wrong</div>;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <DesktopNavigation />

      {/* Header */}
      <MobileHeader heading="Explore Listings">
        <div className="ml-auto">
          <span className="text-sm text-muted-foreground">
            {listings.length} listings
          </span>
        </div>
      </MobileHeader>

      {/* <FilterBar filters={filters} onFiltersChange={setFilters} /> */}

      {/* Listings Grid */}
      <InfiniteScrollContainer
        className="space-y-3"
        onButtomReached={() => hasNextPage && !isFetching && fetchNextPage()}
      >
        <div className="max-w-screen-xl mx-auto px-4 py-6">
          {listings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No listings found matching your filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {listings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  onClick={() => {
                    navigate(`listing/${listing.id}`);
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {isFetchingNextPage && (
          <div className="flex justify-center my-4">
            <Loader className="animate-spin mx-auto" />
          </div>
        )}

        {/* Floating Map Button */}
        <button
          onClick={() => navigate("/map")}
          className="fixed bottom-24 right-4 md:bottom-6 bg-primary text-primary-foreground px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 z-40"
        >
          <MapIcon className="w-5 h-5" />
          <span>Open Map</span>
        </button>
      </InfiniteScrollContainer>

      <BottomNavigation />
    </div>
  );
}
