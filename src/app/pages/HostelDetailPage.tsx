import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import { mockListings } from '../data/mockData';
import { StatusBadge } from '../components/StatusBadge';
import { MapView } from '../components/MapView';
import { BottomNavigation } from '../components/BottomNavigation';
import { DesktopNavigation } from '../components/DesktopNavigation';
import { formatDistanceToNow } from 'date-fns';

export default function HostelDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const listing = mockListings.find((l) => l.id === id && l.type === 'hostel');

  if (!listing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl mb-2">Hostel not found</h2>
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

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <DesktopNavigation />
      
      {/* Image Header */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
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
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Updated {formatDistanceToNow(listing.lastUpdated, { addSuffix: true })}</span>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg mb-2">About</h3>
          <p className="text-muted-foreground">{listing.description}</p>
        </div>

        {/* Room Types */}
        {listing.roomTypes && listing.roomTypes.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg mb-4">Available Room Types</h3>
            <div className="space-y-3">
              {listing.roomTypes.map((room) => (
                <div
                  key={room.id}
                  className="flex items-center justify-between p-4 border border-border rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <h4 className="mb-1">{room.type}</h4>
                    <p className="text-sm text-muted-foreground">
                      Capacity: {room.capacity} {room.capacity === 1 ? 'person' : 'people'}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg text-accent mb-1">
                      GH₵ {room.price}
                      <span className="text-sm text-muted-foreground">/month</span>
                    </div>
                    <StatusBadge status={room.availability} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Map Location */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg mb-4">Location</h3>
          <MapView
            listings={[listing]}
            center={[listing.location.lat, listing.location.lng]}
            zoom={15}
            height="250px"
          />
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg mb-4">Contact Information</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted rounded-lg">
                <Phone className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <a
                  href={`tel:${listing.contact.phone}`}
                  className="text-accent hover:underline"
                >
                  {listing.contact.phone}
                </a>
              </div>
            </div>
            {listing.contact.email && (
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg">
                  <Mail className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a
                    href={`mailto:${listing.contact.email}`}
                    className="text-accent hover:underline"
                  >
                    {listing.contact.email}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA Button */}
        <button className="w-full py-4 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
          <ExternalLink className="w-5 h-5" />
          <span>Contact Hostel Management</span>
        </button>
      </div>

      <BottomNavigation />
    </div>
  );
}