import { useState } from "react";
import { MapView } from "../components/MapView";
import { BottomNavigation } from "../components/BottomNavigation";
import { DesktopNavigation } from "../components/DesktopNavigation";
import { FilterBar } from "../components/FilterBar";
import MobileHeader from "../components/MobileHeader";
import type { ListingFilters } from "../Types/listing";
import { useMapListings } from "../hooks/useListings";

export default function MapPage() {
  const [filters, setFilters] = useState<ListingFilters>({
    listingType: undefined,
    availabilityStatus: "available",
    price: undefined,
    search: "",
  });

  const { data } = useMapListings(filters);
  const listings = data?.data;

  return (
    <div className="h-screen flex flex-col bg-background">
      <DesktopNavigation />

      {/* Header */}
      <MobileHeader heading="Map View" />

      <FilterBar filters={filters} onFiltersChange={setFilters} />

      {/* Map Container */}
      <div className="flex-1 relative">
        <MapView listings={listings ?? []} height="100%" />
      </div>

      <BottomNavigation />
    </div>
  );
}
