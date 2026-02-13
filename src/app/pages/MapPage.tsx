import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, List } from "lucide-react";
import { mockListings } from "../data/mockData";
import { MapView } from "../components/MapView";
import { BottomNavigation } from "../components/BottomNavigation";
import { DesktopNavigation } from "../components/DesktopNavigation";
import { type FilterState } from "../types";
import { FilterBar } from "../components/FilterBar";

export default function MapPage() {
  const navigate = useNavigate();
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
      <header className="bg-white border-b border-border px-4 py-4 flex-shrink-0 md:hidden">
        <div className="max-w-screen-xl mx-auto flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl">Map View</h1>
          <button
            onClick={() => navigate("/explore")}
            className="ml-auto flex items-center gap-2 px-4 py-2 rounded-2xl border border-border hover:bg-muted transition-colors"
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">List View</span>
          </button>
        </div>
      </header>

      <FilterBar filters={filters} onFiltersChange={setFilters} />

      {/* Map Container */}
      <div className="flex-1 relative">
        <MapView listings={filteredListings} height="100%" />
      </div>

      <BottomNavigation />
    </div>
  );
}
