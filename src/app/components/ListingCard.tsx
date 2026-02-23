import { MapPin, Clock, Building2, Home } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { formatDistanceToNow } from "date-fns";
import type { ListingDocument } from "../Types/listing";

interface ListingCardProps {
  listing: ListingDocument;
  onClick?: () => void;
}

export function ListingCard({ listing, onClick }: ListingCardProps) {
  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:scale-101 transition-all duration-300 cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src="room.png"
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <StatusBadge status={listing.availabilityStatus} size="sm" />
        </div>
      </div>

      <div className="relative">
        <div className="p-4 space-y-2">
          <h3 className="text-lg line-clamp-1">{listing.title}</h3>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="line-clamp-1">{listing.location.area}</span>
          </div>

          {listing.listingType === "private" && (
            <div className="text-lg text-accent">
              GH₵{listing.pricing?.monthlyPrice || "N/A"}
              <span className="text-sm text-muted-foreground">/month</span>
            </div>
          )}

          {listing.listingType === "hostel" && (
            <div className="text-sm text-muted-foreground">
              From{" "}
              <span className="text-accent text-lg">
                GH₵{listing.pricing?.priceRange?.min || "N/A"}
              </span>{" "}
              to{" "}
              <span className="text-accent text-lg">
                GH₵{listing.pricing?.priceRange?.max || "N/A"}
              </span>
            </div>
          )}

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>
              Updated{" "}
              {formatDistanceToNow(listing.updatedAt, { addSuffix: true })}
            </span>
          </div>
        </div>

        <div className="absolute bottom-[-17px] right-[-20px] px-6 py-5 border rounded-full group-hover:border-gray-400 transition-all duration-300">
          {listing.listingType === "hostel" ? (
            <div>
              <Building2
                color="#b5baba"
                size={50}
                className="mr-3 group-hover:stroke-gray-400 transition-all duration-300"
              />
              <p className="text-gray-400">Hostel</p>
            </div>
          ) : (
            <div>
              <Home
                color="#b5baba"
                size={50}
                className="mr-3 group-hover:stroke-gray-400 transition-all duration-300"
              />
              <p className="text-gray-400 group-hover:text-gray-400 transition-all duration-300">
                Rental
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
