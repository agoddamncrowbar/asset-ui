import type { MaintenanceJob } from "../../api/maintenance";
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
    <div className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">
            Asset #{job.asset_id}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Maintenance Job #{job.id}
          </p>
        </div>

        <MaintenanceStatusBadge
          status={job.status}
        />
      </div>

      <div className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="font-medium text-slate-600">
            Priority
          </span>

          <MaintenancePriorityBadge
            priority={job.priority}
          />
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-slate-600">
            Assigned To
          </span>

          <span>{job.assigned_to}</span>
        </div>

        <div>
          <p className="mb-1 font-medium text-slate-600">
            Issue Report
          </p>

          <p className="line-clamp-3 text-slate-700">
            {job.issue_report || "No issue report."}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onView(job)}
        className="
          mt-6 w-full rounded-lg
          bg-blue-600 py-2.5
          font-medium text-white
          transition
          hover:bg-blue-700
        "
      >
        View Details
      </button>
    </div>
  );
}