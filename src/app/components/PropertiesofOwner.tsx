import { useNavigate } from "react-router";
import {
  useDeleteListing,
  useListingsOfPropertyOwner,
  useMarkListingAsAvailable,
  useMarkListingAsInactive,
  useUpdateListingPrice,
} from "../hooks/useListings";
import type { ListingDocument } from "../Types/listing";
import { OwnerListingCard } from "./OwnerListingCard";

const PropertiesofOwner = () => {
  const navigate = useNavigate();
  const { data } = useListingsOfPropertyOwner();
  const listings: ListingDocument[] = data?.data;
  const { mutate: markAvilable } = useMarkListingAsAvailable();
  const { mutate: markInactive } = useMarkListingAsInactive();
  const { mutate: deleteListing } = useDeleteListing();
  const { mutate: updatePrice } = useUpdateListingPrice();

  return (
    <div className="px-4">
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <h3 className="my-4 text-center">My Listings</h3>
        {listings?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              You do not have any listings.
            </p>
            <button
              className="px-3 py-1 bg-primary text-white"
              onClick={() => navigate("/add-listing")}
            >
              Add a Listing
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
            {listings?.map((listing) => (
              <OwnerListingCard
                key={listing.id}
                onDelete={deleteListing}
                onMarkAvailable={markAvilable}
                onMarkInactive={markInactive}
                onUpdatePrice={updatePrice}
                listing={listing}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default PropertiesofOwner;
