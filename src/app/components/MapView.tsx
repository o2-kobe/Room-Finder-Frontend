import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon, type LatLngExpression } from "leaflet";
import { type Listing } from "../types";
import { useEffect } from "react";
import { StatusBadge } from "./StatusBadge";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router";

interface MapViewProps {
  listings: Listing[];
  center?: LatLngExpression;
  zoom?: number;
  onMarkerClick?: (listing: Listing) => void;
  height?: string;
}

// Custom marker icons
const hostelIcon = new Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const privateIcon = new Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function MapUpdater({
  center,
  zoom,
}: {
  center?: LatLngExpression;
  zoom?: number;
}) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, zoom || map.getZoom());
    }
  }, [center, zoom, map]);

  return null;
}

export function MapView({
  listings,
  center = [5.6515, -0.187],
  zoom = 13,
  height = "400px",
}: MapViewProps) {
  const navigate = useNavigate();
  return (
    <div
      style={{ height, width: "100%" }}
      className="rounded-2xl overflow-hidden"
    >
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapUpdater center={center} zoom={zoom} />

        {listings.map((listing) => (
          <Marker
            key={listing.id}
            position={[listing.location.lat, listing.location.lng]}
            icon={listing.type === "hostel" ? hostelIcon : privateIcon}
          >
            <Popup>
              <div className="p-1">
                <h4 className="text-sm mb-1">{listing.title}</h4>

                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="h-[100px] w-[400px]"
                />

                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {listing.location.area}
                  </p>
                  <StatusBadge status={listing.availability} size="sm" />
                </div>

                <div className="flex justify-between items-center">
                  {listing.price ? (
                    <span className="text-sm text-accent">
                      GH₵ {listing.price}/month
                    </span>
                  ) : (
                    <span>Price not available</span>
                  )}

                  <span
                    onClick={() => {
                      const path =
                        listing.type === "hostel"
                          ? `/hostel/${listing.id}`
                          : `/rental/${listing.id}`;
                      navigate(path);
                    }}
                    className="text-primary text-xs underline cursor-pointer"
                  >
                    View Details
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
