import { useNavigate, useParams } from "react-router";
import { useListing } from "../hooks/useListings";
import { DesktopNavigation } from "../components/DesktopNavigation";
import {
  ArrowLeft,
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { MapView } from "../components/MapView";
import { BottomNavigation } from "../components/BottomNavigation";
import type { ListingDocument } from "../Types/listing";
import { StatusBadge } from "../components/StatusBadge";
import Loading from "../components/Loading";

const ListingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: queryData, isLoading, isError } = useListing(String(id));

  const listing: ListingDocument = queryData?.data;

  const listingCoords = listing?.location?.coordinates?.coordinates;
  const [lng, lat] =
    listingCoords && listingCoords.length === 2 ? listingCoords : [0, 0];

  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, "_blank");
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !listing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl mb-2">Hostel not found</h2>
          <button
            onClick={() => navigate("/")}
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
          src="room.png"
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
            <StatusBadge status={listing.availabilityStatus} />
          </div>

          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <MapPin className="w-5 h-5" />
            <span>{listing.location?.area}</span>
          </div>

          {listing.listingType === "private" ? (
            <div className="text-2xl text-accent mb-2">
              GH₵ {listing.pricing.monthlyPrice}
              <span className="text-base text-muted-foreground">/month</span>
            </div>
          ) : (
            <div className="text-xl text-muted-foreground">
              From{" "}
              <span className="text-accent text-2xl">
                GH₵{listing.pricing?.priceRange?.min || "N/A"}
              </span>{" "}
              to{" "}
              <span className="text-accent text-2xl">
                GH₵{listing.pricing?.priceRange?.max || "N/A"}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>
              Updated{" "}
              {formatDistanceToNow(listing.updatedAt, { addSuffix: true })}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg mb-2">Description</h3>
          <p className="text-muted-foreground">{listing.description}</p>
        </div>

        {/* Amenities */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg mb-2">Amenities</h3>
          <p>
            <span>This facility has </span>
            {listing.amenities
              ? listing.amenities.map((item) => (
                  <span className="text-accent" key={item}>
                    {item},{" "}
                  </span>
                ))
              : "no amenities attached"}
          </p>
        </div>

        {/* Room Types */}
        {listing.listingType === "hostel" && listing.roomTypes && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg mb-2">Room Types Available</h3>
            <div className="flex flex-col md:flex-row gap-3">
              {listing?.roomTypes?.map((item) => (
                <span
                  className="bg-white rounded-2xl border border-gray-150 p-3 shadow-md"
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Map Location */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg mb-4">Location</h3>
          <MapView
            listings={[listing]}
            center={[lat, lng]}
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
        {listing.listingType === "hostel" && listing.contact.website && (
          <button
            onClick={() => {
              window.open(listing?.contact?.website, "_blank");
            }}
            className="w-full py-4 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-5 h-5" />
            <span>Visit Hostel Website</span>
          </button>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};
export default ListingDetailPage;
