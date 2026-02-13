import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, MapIcon } from "lucide-react";
import { mockListings } from "../data/mockData";
import { ListingCard } from "../components/ListingCard";
import { FilterBar } from "../components/FilterBar";
import { BottomNavigation } from "../components/BottomNavigation";
import { DesktopNavigation } from "../components/DesktopNavigation";
import { type FilterState } from "../types";

export default function ExplorePage() {
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
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <DesktopNavigation />

      {/* Header */}
      <header className="bg-white border-b border-border px-4 py-4">
        <div className="max-w-screen-xl mx-auto flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-muted rounded-full transition-colors md:hidden"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl">Explore Listings</h1>
          <div className="ml-auto">
            <span className="text-sm text-muted-foreground">
              {filteredListings.length} listings
            </span>
          </div>
        </div>
      </header>

      <FilterBar filters={filters} onFiltersChange={setFilters} />

      {/* Listings Grid */}
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        {filteredListings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No listings found matching your filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>

      {/* Floating Map Button */}
      <button
        onClick={() => navigate("/map")}
        className="fixed bottom-24 right-4 md:bottom-6 bg-primary text-primary-foreground px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 z-40"
      >
        <MapIcon className="w-5 h-5" />
        <span>Open Map</span>
      </button>

      <BottomNavigation />
    </div>
  );
}
