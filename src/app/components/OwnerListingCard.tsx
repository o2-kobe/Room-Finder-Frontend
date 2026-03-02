import { useState } from "react";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { ListingDocument } from "../Types/listing";
import { convertToTitleCase } from "../utils/helper";
import { UpdatePriceModal } from "./UpdatePriceModal";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";

interface OwnerListingCardProps {
  listing: ListingDocument;
  onMarkAvailable?: (id: string) => void;
  onMarkInactive?: (id: string) => void;
  onDelete?: (id: string) => void;
  onUpdatePrice?: (id: string, price: number) => void;
}

export function OwnerListingCard({
  listing,
  onMarkAvailable,
  onMarkInactive,
  onDelete,
  onUpdatePrice,
}: OwnerListingCardProps) {
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const isAvailable = listing.availabilityStatus === "available";

  const currentPrice =
    listing.listingType === "private"
      ? listing.pricing?.monthlyPrice
      : listing.pricing?.priceRange?.max;

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Image */}
        <div className="h-48 overflow-hidden">
          <img
            src="room.png"
            alt={listing.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <h3 className="text-lg font-semibold line-clamp-1">
            {convertToTitleCase(listing.title)}
          </h3>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{listing.location.area}</span>
          </div>

          <div className="text-lg text-accent font-medium">
            GH₵{currentPrice || "N/A"}
          </div>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>
              Updated{" "}
              {formatDistanceToNow(listing.updatedAt, { addSuffix: true })}
            </span>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-between items-center p-3 shadow-md rounded-md border border-gray-200">
            <p className="flex items-center gap-2">
              Actions <ArrowRight />{" "}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {isAvailable ? (
                <button
                  onClick={() => onMarkInactive?.(listing.id)}
                  className="px-3 py-1 text-sm shadow-md border border-gray-200 bg-yellow-300 text-white rounded-lg hover:bg-yellow-400 transition"
                >
                  Mark Inactive
                </button>
              ) : (
                <button
                  onClick={() => onMarkAvailable?.(listing.id)}
                  className="px-3 py-1 text-sm border border-gray-200 bg-green-400 rounded-lg text-white hover:bg-green-300 transition"
                >
                  Mark Available
                </button>
              )}

              <button
                onClick={() => setShowPriceModal(true)}
                className="px-3 py-1 text-sm shadow-md border border-gray-200 text-white bg-blue-400 rounded-lg hover:bg-blue-400 transition"
              >
                Update Price
              </button>

              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Price Modal */}
      {showPriceModal && (
        <UpdatePriceModal
          currentPrice={currentPrice || 0}
          onClose={() => setShowPriceModal(false)}
          onSubmit={(price) => {
            onUpdatePrice?.(listing.id, price);
            setShowPriceModal(false);
          }}
        />
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <ConfirmDeleteModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => {
            onDelete?.(listing.id);
            setShowDeleteModal(false);
          }}
        />
      )}
    </>
  );
}
