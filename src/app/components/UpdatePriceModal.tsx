import { Info } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface UpdatePriceModalProps {
  currentPrice: number;
  onClose: () => void;
  onSubmit: (price: number) => void;
}

export function UpdatePriceModal({
  currentPrice,
  onClose,
  onSubmit,
}: UpdatePriceModalProps) {
  const [price, setPrice] = useState(currentPrice);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-80 space-y-4 shadow-lg">
        <h2 className="text-lg font-semibold">Update Price</h2>

        <p className="text-xs md:text:sm flex items-center gap-1">
          <Info /> You can only update the maximum price for hostels.
        </p>

        <div className="flex items-center border rounded-lg px-3 py-2">
          <span className="text-muted-foreground mr-2">GH₵</span>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full outline-none"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-3 py-1 text-sm bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              try {
                onSubmit(price);
                toast.success("Listing updated successfully");
              } catch {
                toast.error("Failed to update listing");
              }
            }}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
