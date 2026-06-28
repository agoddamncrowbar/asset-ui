import type { MaintenancePriority } from "../../api/maintenance";

interface Props {
  priority: MaintenancePriority;
}

export default function MaintenancePriorityBadge({
  priority,
}: Props) {
  const styles: Record<MaintenancePriority, string> = {
    low:
      "bg-slate-100 text-slate-700 border border-slate-200",

    medium:
      "bg-orange-100 text-orange-800 border border-orange-200",

    high:
      "bg-red-100 text-red-800 border border-red-200",
  };

  const labels: Record<MaintenancePriority, string> = {
    low: "Low",
    medium: "Medium",
    high: "High",
  };

  return (
    <span
      className={`
        inline-flex items-center
        rounded-full
        px-3 py-1
        text-xs font-semibold
        ${styles[priority]}
      `}
    >
      {labels[priority]}
    </span>
  );
}