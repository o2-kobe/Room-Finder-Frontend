import { Search, SlidersHorizontal } from "lucide-react";
import { CategoryToggle } from "./CategoryToggle";
import { type FilterState } from "../types";

interface FilterBarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export function FilterBar({ filters, onFiltersChange }: FilterBarProps) {
  return (
    <div className="bg-white border-b border-border sticky top-0 z-40">
      <div className="max-w-screen-xl mx-auto px-4 py-3 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by university or area..."
            value={filters.searchQuery}
            onChange={(e) =>
              onFiltersChange({ ...filters, searchQuery: e.target.value })
            }
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-input-background border border-transparent focus:border-primary focus:outline-none transition-colors"
          />
        </div>

        <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1">
          <CategoryToggle
            selected={filters.category}
            onChange={(category) => onFiltersChange({ ...filters, category })}
          />

          <button className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-border bg-white hover:bg-muted transition-colors whitespace-nowrap">
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
}
