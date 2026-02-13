import { type ListingType } from "../types";

interface CategoryToggleProps {
  selected: ListingType | "all";
  onChange: (category: ListingType | "all") => void;
}

export function CategoryToggle({ selected, onChange }: CategoryToggleProps) {
  const categories: { value: ListingType | "all"; label: string }[] = [
    { value: "all", label: "All" },
    { value: "hostel", label: "Hostels" },
    { value: "private", label: "Private Rentals" },
  ];

  return (
    <div className="inline-flex rounded-2xl bg-white p-1 shadow-sm border border-border">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => onChange(category.value)}
          className={`
            px-4 py-2 rounded-xl transition-all
            ${
              selected === category.value
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-foreground hover:bg-muted"
            }
          `}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
