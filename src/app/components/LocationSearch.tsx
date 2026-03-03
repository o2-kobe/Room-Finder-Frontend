import { useState, useEffect } from "react";
import {
  type FieldValues,
  type UseFormSetValue,
  type Path,
} from "react-hook-form";

interface Suggestion {
  display_name: string;
  lat: string;
  lon: string;
}

interface LocationSearchProps<T extends FieldValues> {
  setValue: UseFormSetValue<T>;
  addressField: Path<T>;
  coordinatesField: Path<T>;
}

export default function LocationSearch<T extends FieldValues>({
  setValue,
  addressField,
  coordinatesField,
}: LocationSearchProps<T>) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_LOCATIONIQ_API_KEY;

  useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://us1.locationiq.com/v1/autocomplete.php?key=${API_KEY}&q=${query}&format=json&countrycodes=gh`,
        );

        const data = await res.json();
        setResults(data);
      } catch (error) {
        console.error("LocationIQ error:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 400);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSelect = (place: Suggestion) => {
    // Set address dynamically
    setValue(addressField, place.display_name as any);

    // Set coordinates dynamically
    setValue(coordinatesField, {
      type: "Point",
      coordinates: [Number(place.lon), Number(place.lat)],
    } as any);

    setQuery(place.display_name);
    setResults([]);
  };

  return (
    <div className="relative w-full mt-4">
      <label className="text-accent" htmlFor="Exact-location">
        Type in closest landmark (or PropertyName) to get exact
        address(location) *
      </label>
      <input
        id="Exact-Location"
        type="text"
        placeholder="Search exact property location..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border rounded-lg px-4 py-2"
      />

      {loading && (
        <div className="absolute bg-white w-full shadow-md p-2 text-sm">
          Searching...
        </div>
      )}

      {results.length > 0 && (
        <ul className="absolute bg-white w-full shadow-lg rounded-lg mt-1 max-h-60 overflow-y-auto z-50">
          {results.map((place, index) => (
            <li
              key={index}
              onClick={() => handleSelect(place)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
