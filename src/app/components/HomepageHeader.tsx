import { Search } from "lucide-react";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import type { ListingFilters } from "../Types/listing";

interface HomepageHeaderProps {
  filters: ListingFilters;
  onFiltersChange: (filters: ListingFilters) => void;
}

const HomepageHeader = ({ filters, onFiltersChange }: HomepageHeaderProps) => {
  const [localSearch, setLocalSearch] = useState(filters.search || "");

  const debounced = useDebouncedCallback((value: string) => {
    onFiltersChange({ ...filters, search: value });
  }, 1000);
  return (
    <header className="bg-primary text-primary-foreground px-4 py-6">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-2xl mb-4">Find Your Student Room</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by university or area..."
            value={localSearch}
            onChange={(e) => {
              const value = e.target.value;
              setLocalSearch(value);
              debounced(value);
            }}
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>
    </header>
  );
};
export default HomepageHeader;
