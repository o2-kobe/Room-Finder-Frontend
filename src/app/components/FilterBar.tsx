import { useState } from "react";
import { Search } from "lucide-react";
import { CategoryToggle } from "./CategoryToggle";
import FilterButton from "./FilterButton";
import type { ListingFilters } from "../Types/listing";
import { useDebouncedCallback } from "use-debounce";

interface FilterBarProps {
  filters: ListingFilters;
  onFiltersChange: (filters: ListingFilters) => void;
  showExtraFilters?: boolean;
}

export function FilterBar({
  filters,
  onFiltersChange,
  showExtraFilters,
}: FilterBarProps) {
  const [localSearch, setLocalSearch] = useState(filters.search || "");

  const debounced = useDebouncedCallback((value: string) => {
    onFiltersChange({ ...filters, search: value });
  }, 1000);

  return (
    <div className="bg-white border-b border-border sticky top-1 z-40 ">
      <div className="max-w-screen-xl mx-auto px-4 py-3 space-y-3">
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
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-input-background border border-transparent focus:border-primary focus:outline-none transition-colors"
          />
        </div>

        <div className="flex items-center justify-between overflow-x-auto pb-1">
          <CategoryToggle
            selected={filters.listingType}
            onChange={(listingType) =>
              onFiltersChange({ ...filters, listingType })
            }
          />

          {showExtraFilters ? (
            <FilterButton
              availabilityStatus={filters.availabilityStatus}
              price={filters.price}
              onChange={(changes) =>
                onFiltersChange({ ...filters, ...changes })
              }
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
