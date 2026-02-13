import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { mockListings } from '../data/mockData';
import { StatusBadge } from '../components/StatusBadge';
import { MapView } from '../components/MapView';
import { BottomNavigation } from '../components/BottomNavigation';
import { DesktopNavigation } from '../components/DesktopNavigation';
import { formatDistanceToNow } from 'date-fns';

export default function RentalDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const listing = mockListings.find((l) => l.id === id && l.type === 'private');

  if (!listing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl mb-2">Rental not found</h2>
          <button
            onClick={() => navigate('/')}
            className="text-accent hover:underline"
          >
            Return to home
          </button>
        </div>
      </div>
    );
  }

  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${listing.location.lat},${listing.location.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <DesktopNavigation />
      
      {/* Image Gallery */}
      <div className="relative">
        <div className="flex gap-1 overflow-x-auto snap-x snap-mandatory">
          {listing.images.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full h-72 snap-start overflow-hidden"
            >
              <img
                src={image}
                alt={`${listing.title} - ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        {listing.images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
            1 / {listing.images.length}
          </div>
        )}
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
        {/* Header Info */}
        <div>
          <div className="flex items-start justify-between gap-4 mb-3">
            <h1 className="text-2xl">{listing.title}</h1>
            <StatusBadge status={listing.availability} />
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <MapPin className="w-5 h-5" />
            <span>{listing.location.address}</span>
            {listing.location.distance && (
              <span className="text-sm">• {listing.location.distance}</span>
            )}
          </div>

          {listing.price && (
            <div className="text-2xl text-accent mb-2">
              GH₵ {listing.price}
              <span className="text-base text-muted-foreground">/month</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Updated {formatDistanceToNow(listing.lastUpdated, { addSuffix: true })}</span>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg mb-2">Description</h3>
          <p className="text-muted-foreground">{listing.description}</p>
        </div>

        {/* Map Location */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg mb-4">Location</h3>
          <MapView
            listings={[listing]}
            center={[listing.location.lat, listing.location.lng]}
            zoom={15}
            height="250px"
          />
          <button
            onClick={handleGetDirections}
            className="w-full mt-4 py-3 border border-border rounded-xl hover:bg-muted transition-colors flex items-center justify-center gap-2"
          >
            <Navigation className="w-5 h-5" />
            <span>Get Directions</span>
          </button>
        </div>

        {/* Landlord Contact */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg mb-4">Contact Landlord</h3>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
              <span className="text-xl">
                {listing.contact.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-medium">{listing.contact.name}</p>
              <p className="text-sm text-muted-foreground">Property Owner</p>
            </div>
          </div>
          <a
            href={`tel:${listing.contact.phone}`}
            className="w-full flex items-center justify-center gap-2 py-4 bg-accent text-accent-foreground rounded-2xl hover:bg-accent/90 transition-colors"
          >
            <Phone className="w-5 h-5" />
            <span>Call {listing.contact.phone}</span>
          </a>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}