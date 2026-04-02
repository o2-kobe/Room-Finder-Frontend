import { AlertTriangle } from "lucide-react";

interface ConfirmDeleteModalProps {
  title?: string;
  description?: string;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function ConfirmDeleteModal({
  title = "Delete Listing",
  description = "This action cannot be undone. This listing will be permanently removed.",
  onClose,
  onConfirm,
  isLoading = false,
}: ConfirmDeleteModalProps) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="bg-red-100 p-2 rounded-full">
            <AlertTriangle className="text-red-600" size={20} />
          </div>
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>

        <p className="text-sm text-muted-foreground">{description}</p>

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onConfirm();
            }}
            disabled={isLoading}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-60"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
