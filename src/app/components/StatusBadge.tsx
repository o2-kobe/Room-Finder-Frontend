import { type AvailabilityStatus } from "../types";

interface StatusBadgeProps {
  status: AvailabilityStatus;
  size?: "sm" | "md";
}

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const statusConfig = {
    available: {
      label: "Available",
      color: "bg-green-700 text-white",
    },
    "recently-updated": {
      label: "Recently Updated",
      color: "bg-[#f59e0b] text-white",
    },
    inactive: {
      label: "Inactive",
      color: "bg-[#9ca3af] text-white",
    },
  };

  const config = statusConfig[status];
  const sizeClasses =
    size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm";

  return (
    <p className=" bg-white rounded-full flex items-center p-0.5">
      <span
        className={`inline-flex items-center rounded-full ${sizeClasses} ${config.color}`}
      >
        {config.label}
      </span>
    </p>
  );
}
