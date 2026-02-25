interface CategoryToggleProps {
  selected: any | "all";
  onChange: (category: any | "all") => void;
}

export function CategoryToggle({ selected, onChange }: CategoryToggleProps) {
  const categories: { value: any | "all"; label: string }[] = [
    { value: undefined, label: "All" },
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
            px-2 py-1 md:px-4 md:py-2 rounded-xl transition-all text-sm md:text-base
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
