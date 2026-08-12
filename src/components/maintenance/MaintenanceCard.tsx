import type { MaintenanceJob } from "../../api/types/maintenance";
import MaintenancePriorityBadge from "./MaintenancePriorityBadge";
import MaintenanceStatusBadge from "./MaintenanceStatusBadge";

interface Props {
  job: MaintenanceJob;
  onView: (job: MaintenanceJob) => void;
}

export default function MaintenanceCard({
  job,
  onView,
}: Props) {
  return (
    <div className="border border-slate-200 bg-white overflow-hidden transition-colors hover:bg-blue-50/40">
      <div className="border-b border-slate-200 px-4 py-3 flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-slate-900">
            Asset #{job.asset_id}
          </h3>

          <p className="mt-0.5 text-xs font-medium text-slate-400">
            Job #{job.id}
          </p>
        </div>

        <MaintenanceStatusBadge status={job.status} />
      </div>

      <div className="px-4 py-3 space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Priority
          </span>

          <MaintenancePriorityBadge priority={job.priority} />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Assigned To
          </span>

          <span className="font-medium text-slate-900">
            {job.assigned_to}
          </span>
        </div>

        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Issue Report
          </p>

          <p className="line-clamp-3 text-slate-600">
            {job.issue_report || "No issue report."}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onView(job)}
        className="
          w-full border-t border-slate-200 py-2.5
          text-xs font-semibold uppercase tracking-wide
          text-slate-600
          transition-colors
          hover:bg-blue-50 hover:text-blue-700
        "
      >
        View Details
      </button>
    </div>
  );
}