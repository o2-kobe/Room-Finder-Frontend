import { useState } from "react";
import {
  type Control,
  type FieldErrors,
  type FieldValues,
  type Path,
  useController,
} from "react-hook-form";

// 1. We create a guarantee for TypeScript that whatever form uses this, it has an 'amenities' array
interface BaseAmenitiesForm {
  amenities: string[];
}

// 2. We use a Generic <T> that merges React Hook Form's base types with our guarantee
interface AmenitiesInputProps<T extends FieldValues & BaseAmenitiesForm> {
  control: Control<T>;
  errors: FieldErrors<T>;
}

// 3. Make the component itself generic
export default function AmenitiesInput<
  T extends FieldValues & BaseAmenitiesForm,
>({ control, errors }: AmenitiesInputProps<T>) {
  const [inputValue, setInputValue] = useState("");

  const { field } = useController({
    // We cast the name to Path<T> so useController knows it strictly belongs to the parent form
    name: "amenities" as Path<T>,
    control,
  });

  // 4. Explicitly type the value as an array of strings to fix mapping errors
  const amenities: string[] = field.value || [];

  const handleAdd = () => {
    const trimmed = inputValue.trim();

    if (!trimmed) return;

    if (amenities.length >= 6) {
      alert("Maximum of 6 amenities allowed.");
      return;
    }

    field.onChange([...amenities, trimmed]);
    setInputValue("");
  };

  const handleRemove = (indexToRemove: number) => {
    field.onChange(amenities.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
      <h3 className="text-lg font-medium">Amenities (Max 6)</h3>

      <div className="flex gap-2">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd();
            }
          }}
          placeholder="e.g., Free WiFi"
          className="flex-1 px-4 py-3 rounded-xl border focus:border-primary focus:outline-none"
        />

        <button
          type="button"
          onClick={handleAdd}
          className="px-4 py-3 bg-primary text-white rounded-xl"
        >
          Add
        </button>
      </div>

      {amenities.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {amenities.map((amenity, index) => (
            <div
              key={index}
              className="flex items-center bg-muted px-3 py-1 rounded-full text-sm"
            >
              <span>{amenity}</span>

              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="ml-2 text-red-500 font-semibold"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Accessing errors dynamically is safe because we guaranteed 'amenities' exists in our Generic */}
      {errors.amenities && (
        <p className="text-red-500 text-sm">
          {errors.amenities.message as string}
        </p>
      )}
    </div>
  );
}
