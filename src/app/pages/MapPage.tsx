import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, List } from "lucide-react";
import { mockListings } from "../data/mockData";
import { MapView } from "../components/MapView";
import { ListingCard } from "../components/ListingCard";
import { BottomNavigation } from "../components/BottomNavigation";
import { DesktopNavigation } from "../components/DesktopNavigation";
import { type Listing, type FilterState } from "../types";
import { FilterBar } from "../components/FilterBar";

export default function MapPage() {
  const navigate = useNavigate();
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
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

  const handleMarkerClick = (listing: Listing) => {
    setSelectedListing(listing);
  };

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
        <MapView
          listings={filteredListings}
          height="100%"
          onMarkerClick={handleMarkerClick}
        />

        {/* Sliding Bottom Panel */}
        {selectedListing && (
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl p-4 max-h-[50vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-4" />
            <ListingCard
              listing={selectedListing}
              onClick={() => {
                const path =
                  selectedListing.type === "hostel"
                    ? `/hostel/${selectedListing.id}`
                    : `/rental/${selectedListing.id}`;
                navigate(path);
              }}
            />
            <button
              onClick={() => setSelectedListing(null)}
              className="w-full mt-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>

      <BottomNavigation />
      <DesktopNavigation />
    </div>
  );
}
