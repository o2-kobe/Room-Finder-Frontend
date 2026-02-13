import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import { Listing } from '../types';
import { useEffect } from 'react';

interface MapViewProps {
  listings: Listing[];
  center?: LatLngExpression;
  zoom?: number;
  onMarkerClick?: (listing: Listing) => void;
  height?: string;
}

// Custom marker icons
const hostelIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const privateIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function MapUpdater({ center, zoom }: { center?: LatLngExpression; zoom?: number }) {
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
  center = [5.6515, -0.1870], 
  zoom = 13,
  onMarkerClick,
  height = '400px' 
}: MapViewProps) {
  return (
    <div style={{ height, width: '100%' }} className="rounded-2xl overflow-hidden">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
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
            icon={listing.type === 'hostel' ? hostelIcon : privateIcon}
            eventHandlers={{
              click: () => onMarkerClick?.(listing)
            }}
          >
            <Popup>
              <div className="p-2">
                <h4 className="text-sm mb-1">{listing.title}</h4>
                <p className="text-xs text-muted-foreground">{listing.location.area}</p>
                {listing.price && (
                  <p className="text-sm text-accent mt-1">GH₵ {listing.price}/month</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
