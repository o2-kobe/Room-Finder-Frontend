import { useState } from "react";
import { mockListings } from "../data/mockData";
import { MapView } from "../components/MapView";
import { BottomNavigation } from "../components/BottomNavigation";
import { DesktopNavigation } from "../components/DesktopNavigation";
import { type FilterState } from "../types";
import { FilterBar } from "../components/FilterBar";
import MobileHeader from "../components/MobileHeader";

export default function MapPage() {
  const [filters, setFilters] = useState<FilterState>({
    category: "all",
    availability: "all",
    searchQuery: "",
  });

  const filteredListings = mockListings.filter((listing) => {
    const matchesCategory =
      filters.category === "all" || listing.type === filters.category;
    const matchesAvailability =
      filters.availability === "all" ||
      listing.availability === filters.availability;
    const matchesSearch =
      filters.searchQuery === "" ||
      listing.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      listing.location.area
        .toLowerCase()
        .includes(filters.searchQuery.toLowerCase()) ||
      listing.location.university
        .toLowerCase()
        .includes(filters.searchQuery.toLowerCase());
    return matchesCategory && matchesAvailability && matchesSearch;
  });

  return (
    <div className="h-screen flex flex-col bg-background">
      <DesktopNavigation />

      {/* Header */}
      <MobileHeader heading="Map View" />

      <FilterBar filters={filters} onFiltersChange={setFilters} />

      {/* Map Container */}
      <div className="flex-1 relative">
        <MapView listings={filteredListings} height="100%" />
      </div>

      <BottomNavigation />
    </div>
  );
}
