import { useState } from "react";
import { useAuth } from "../auth/useAuth";
import type { MaintenanceJob } from "../api/maintenance";
import { useMaintenance } from "../components/maintenance/useMaintenance";
import {
  AccessDeniedModal,
  MaintenanceDetailsModal,
  MaintenanceList,
} from "../components/maintenance";

export default function Maintenance() {
  const { token } = useAuth();

  const { jobs, loading, refreshJobs } =
    useMaintenance({
      token: token!,
    });

  const [selectedJob, setSelectedJob] =
    useState<MaintenanceJob | null>(null);

  const [detailsOpen, setDetailsOpen] =
    useState(false);

  const [accessDeniedOpen, setAccessDeniedOpen] =
    useState(false);

  function handleView(job: MaintenanceJob) {
    setSelectedJob(job);
    setDetailsOpen(true);
  }

  function closeDetails() {
    setDetailsOpen(false);
    setSelectedJob(null);
  }

  function handleUpdated() {
    refreshJobs();
  }

  function handleUnauthorized() {
    setDetailsOpen(false);
    setAccessDeniedOpen(true);
  }

  return (
    <>
      <div className="mx-auto max-w-7xl p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Maintenance Jobs
          </h1>

          <p className="mt-2 text-slate-500">
            View and manage maintenance jobs assigned
            to technicians.
          </p>
        </div>

        <MaintenanceList
          jobs={jobs}
          loading={loading}
          onView={handleView}
        />
      </div>

      <MaintenanceDetailsModal
        isOpen={detailsOpen}
        job={selectedJob}
        token={token!}
        onClose={closeDetails}
        onUpdated={handleUpdated}
        onUnauthorized={handleUnauthorized}
      />

      <AccessDeniedModal
        isOpen={accessDeniedOpen}
        onClose={() =>
          setAccessDeniedOpen(false)
        }
      />
    </>
  );
}