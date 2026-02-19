import { CircleDot, SlidersHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const FilterButton = () => {
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
        className={`${isOpen ? "" : "hidden"} absolute top-full overflow-hidden right-0 w-30 md:w-40 mt-2 bg-white border border-border rounded-lg shadow-xl ml-3`}
      >
        <button className="filter-option flex items-center gap-2">
          <CircleDot size={13} color="green" /> Available
        </button>
        <button className="filter-option flex items-center gap-2">
          <CircleDot size={13} color="gray" /> Inactive
        </button>
        <button className="filter-option">&lt; less than &#8353; 500</button>
        <button className="filter-option">&lt; less than &#8353; 500</button>
        <button className="filter-option">&lt; less than &#8353; 1000</button>
        <button className="filter-option">&lt; less than &#8353; 2000</button>
        <button className="filter-option">&lt; less than &#8353; 3000</button>
        <button className="filter-option">&gt; above &#8353; 3000</button>
      </div>
    </div>
  );
};

export default FilterButton;
