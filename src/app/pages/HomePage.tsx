import { useState } from "react";
import { useNavigate } from "react-router";
import { MapIcon } from "lucide-react";
import { ListingCard } from "../components/ListingCard";
import { CategoryToggle } from "../components/CategoryToggle";
import { BottomNavigation } from "../components/BottomNavigation";
import { DesktopNavigation } from "../components/DesktopNavigation";
import { MapView } from "../components/MapView";
import { useListings } from "../hooks/useListings";
import Loading from "../components/Loading";
import type { ListingFilters } from "../Types/listing";
import { RecentlyUpdated } from "../components/RecentlyUpdated";
import HomepageHeader from "../components/HomepageHeader";

export default function HomePage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<ListingFilters>({
    listingType: undefined,
    availabilityStatus: "available",
    search: "",
  });

  const { data, isLoading, isError } = useListings(filters);

  const listings = data?.pages.flatMap((page) => page.data) ?? [];

  if (isLoading) return <Loading />;
  if (isError) return <div>Something went wrong</div>;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <DesktopNavigation />

      {/* Header */}
      <HomepageHeader filters={filters} onFiltersChange={setFilters} />

      {/* Category Toggle */}
      <div className="px-4 py-4 flex justify-center">
        <CategoryToggle
          selected={filters.listingType}
          onChange={(listingType) => setFilters({ ...filters, listingType })}
        />
      </div>

      <div className="max-w-screen-xl mx-auto px-4 space-y-8">
        {/* Featured Listings */}
        <section>
          <h2 className="text-xl mb-4">Available Now</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {listings.slice(0, 6).map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onClick={() => navigate(`/explore/listing/${listing.id}`)}
              />
            ))}
          </div>
          {listings.length === 0 ? (
            <p className="text-gray-500 text-center">
              No listings found matching your filters.
            </p>
          ) : null}
        </section>

        {/* Recently Updated */}
        <RecentlyUpdated listings={listings} />

        {/* Map Preview */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl">Explore on Map</h2>
            <button
              onClick={() => navigate("/map")}
              className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
            >
              <MapIcon className="w-5 h-5" />
              <span>View Full Map</span>
            </button>
          </div>
          <MapView listings={listings} height="300px" />
        </section>

        {/* All Listings Link */}
        <div className="text-center pb-8">
          <button
            onClick={() => navigate("/explore")}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 transition-colors"
          >
            View All Listings
          </button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
