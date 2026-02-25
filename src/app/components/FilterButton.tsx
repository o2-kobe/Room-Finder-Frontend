import { CircleDot, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ListingFilters } from "../Types/listing";

interface FilterButtonProps {
  availabilityStatus?: ListingFilters["availabilityStatus"];
  price?: ListingFilters["price"];
  onChange: (changes: Partial<ListingFilters>) => void;
}

const FilterButton = ({
  availabilityStatus,
  price,
  onChange,
}: FilterButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event?.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const toggleAvailability = (status: ListingFilters["availabilityStatus"]) => {
    onChange({
      availabilityStatus: availabilityStatus === status ? undefined : status,
    });
    setIsOpen(false);
  };

  const setPriceFilter = (value: number) => {
    onChange({ price: price === value ? undefined : value });
    setIsOpen(false);
  };

  const clearFilters = () => {
    onChange({
      listingType: undefined,
      availabilityStatus: undefined,
      price: undefined,
      search: "",
    });
    setIsOpen(false);
  };

  return (
    <div className="absolute right-4" ref={filterRef}>
      <button
        onClick={() => {
          setIsOpen((open) => !open);
        }}
        className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-border bg-white hover:bg-muted transition-colors whitespace-nowrap"
      >
        <SlidersHorizontal className="w-4 h-4" />
        <span className="text-xs md:inline-block md:text-base">Filters</span>
      </button>

      <div
        className={`${isOpen ? "" : "hidden"} absolute top-full overflow-hidden right-0 w-33 md:w-40 mt-2 bg-white border border-gray-300 rounded-lg shadow-xl ml-3`}
      >
        <button
          className={`filter-option flex items-center gap-2 ${
            availabilityStatus === "available" ? "bg-gray-300 font-bold" : ""
          }`}
          onClick={() => toggleAvailability("available")}
        >
          <CircleDot size={13} color="green" /> Available
        </button>
        <button
          className={`filter-option flex items-center gap-2 ${
            availabilityStatus === "inactive" ? "bg-gray-300 font-bold" : ""
          }`}
          onClick={() => toggleAvailability("inactive")}
        >
          <X size={13} color="gray" /> Inactive
        </button>
        <hr className="bg-gray-500" />
        <button
          className={`filter-option ${
            price === 500 ? "bg-gray-300 font-bold" : ""
          }`}
          onClick={() => setPriceFilter(500)}
        >
          &lt; less than &#8353; 500
        </button>
        <button
          className={`filter-option ${
            price === 1000 ? "bg-gray-300 font-bold" : ""
          }`}
          onClick={() => setPriceFilter(1000)}
        >
          &lt; less than &#8353; 1000
        </button>
        <button
          className={`filter-option ${
            price === 5000 ? "bg-gray-300 font-bold" : ""
          }`}
          onClick={() => setPriceFilter(5000)}
        >
          &lt; less than &#8353; 5000
        </button>
        <button
          className={`filter-option ${
            price === 10000 ? "bg-gray-300 font-bold" : ""
          }`}
          onClick={() => setPriceFilter(10000)}
        >
          &lt; less than &#8353; 10000
        </button>
        <button
          className={`filter-option ${
            price === 15000 ? "bg-gray-300 font-bold" : ""
          }`}
          onClick={() => setPriceFilter(15000)}
        >
          &lt; less than &#8353; 15000
        </button>
        <hr className="bg-gray-500" />
        <button
          onClick={clearFilters}
          className="filter-option text-center hover:bg-primary hover:text-white"
        >
          Clear filters
        </button>
      </div>
    </div>
  );
};

export default FilterButton;
