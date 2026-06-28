import type { MaintenanceJob } from "../../api/maintenance";
import MaintenanceCard from "./MaintenanceCard";

interface Props {
  jobs: MaintenanceJob[];
  loading?: boolean;
  onView: (job: MaintenanceJob) => void;
}

export default function MaintenanceList({
  jobs,
  loading = false,
  onView,
}: Props) {
  if (loading) {
    return (
      <div className="py-12 text-center text-slate-500">
        Loading maintenance jobs...
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="rounded-xl border border-dashed bg-white p-12 text-center">
        <h3 className="text-lg font-semibold text-slate-700">
          No maintenance jobs found
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Maintenance jobs will appear here when they are created.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {jobs.map((job) => (
        <MaintenanceCard
          key={job.id}
          job={job}
          onView={onView}
        />
      ))}
    </div>
  );
}