import type { ListingDocument } from "../Types/listing";
import { ListingCard } from "./ListingCard";
import React from "react";

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 48;

export const RecentlyUpdated = ({
  listings,
}: {
  listings: ListingDocument[];
}) => {
  // Two days in milliseconds

  const recents: ListingDocument[] = listings.filter((listing) => {
    const updated = new Date(listing.updatedAt).getTime();
    if (!Number.isFinite(updated)) return false;
    return Date.now() - updated <= ONE_DAY_IN_MS;
  });
  return (
    <section>
      <h2 className="text-xl mb-4">Recently Updated</h2>

      <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
        {recents.map((listing) => (
          <div key={listing.id} className="flex-shrink-0 w-80 snap-start">
            <ListingCard listing={listing} />
          </div>
        ))}
      </div>

      {recents.length === 0 && (
        <p className="text-center text-gray-500 my-3">
          No Listings updated within the last 2 days
        </p>
      )}
    </section>
  );
};

const RecentSpan = ({ updateTime }: { updateTime: Date }) => {
  const updated = new Date(updateTime).getTime();
  if (!Number.isFinite(updated)) return false;
  if (Date.now() - updated <= ONE_DAY_IN_MS)
    return (
      <span className="flex items-center w-fit text-sm px-1 bg-[#d0d630] text-white font-bold rounded-md">
        recently updated
      </span>
    );
};

export default React.memo(RecentSpan);
