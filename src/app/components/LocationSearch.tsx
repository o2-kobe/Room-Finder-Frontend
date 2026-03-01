import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { useRef } from "react";

interface LocationValue {
  address: string;
  lat: number;
  lng: number;
}

interface LocationSearchProps {
  value?: LocationValue;
  onChange?: (location: LocationValue) => void;
}

const libraries: "places"[] = ["places"];

export function LocationSearch({ value, onChange }: LocationSearchProps) {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (!isLoaded) return <p>Loading...</p>;

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace();

    if (!place?.geometry?.location) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    onChange &&
      onChange({
        address: place.formatted_address || "",
        lat,
        lng,
      });
  };

  return (
    // <div className="space-y-5 bg-white rounded-2xl p-6 shadow-sm">
    <Autocomplete
      onLoad={(ref) => (autocompleteRef.current = ref)}
      onPlaceChanged={handlePlaceChanged}
    >
      <input
        type="text"
        defaultValue={value?.address}
        placeholder="Search nearest landmark to insert coordinates..."
        className="w-full px-4 py-3 rounded-xl border"
      />
    </Autocomplete>
    // </div>
  );
}
