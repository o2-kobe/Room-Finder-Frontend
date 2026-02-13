import { useNavigate } from "react-router";
import { MapPin, Clock } from "lucide-react";
import { type Listing } from "../types";
import { StatusBadge } from "./StatusBadge";
import { formatDistanceToNow } from "date-fns";

interface ListingCardProps {
  listing: Listing;
  onClick?: () => void;
}

export function ListingCard({ listing, onClick }: ListingCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      const path =
        listing.type === "hostel"
          ? `/hostel/${listing.id}`
          : `/rental/${listing.id}`;
      navigate(path);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <StatusBadge status={listing.availability} size="sm" />
        </div>
        {listing.type === "hostel" && (
          <div className="absolute top-3 left-3 bg-primary/90 text-primary-foreground px-2 py-1 rounded-lg text-xs">
            Hostel
          </div>
        )}
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-lg line-clamp-1">{listing.title}</h3>

        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span className="line-clamp-1">{listing.location.area}</span>
          {listing.location.distance && (
            <span className="text-xs">• {listing.location.distance}</span>
          )}
        </div>

        {listing.price && (
          <div className="text-lg text-accent">
            GH₵ {listing.price}
            <span className="text-sm text-muted-foreground">/month</span>
          </div>
        )}

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span>
            Updated{" "}
            {formatDistanceToNow(listing.lastUpdated, { addSuffix: true })}
          </span>
        </div>
      </div>
    </div>
  );
}
