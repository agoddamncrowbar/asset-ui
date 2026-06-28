import type { MaintenanceStatus } from "../../api/maintenance";

interface Props {
  status: MaintenanceStatus;
}

export default function MaintenanceStatusBadge({
  status,
}: Props) {
  const styles: Record<MaintenanceStatus, string> = {
    queued:
      "bg-amber-100 text-amber-800 border border-amber-200",

    in_progress:
      "bg-blue-100 text-blue-800 border border-blue-200",

    completed:
      "bg-green-100 text-green-800 border border-green-200",

    cancelled:
      "bg-red-100 text-red-800 border border-red-200",
  };

  const labels: Record<MaintenanceStatus, string> = {
    queued: "Queued",
    in_progress: "In Progress",
    completed: "Completed",
    cancelled: "Cancelled",
  };

  return (
    <span
      className={`
        inline-flex items-center
        rounded-full
        px-3 py-1
        text-xs font-semibold
        ${styles[status]}
      `}
    >
      {labels[status]}
    </span>
  );
}