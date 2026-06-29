import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import type {  MaintenanceJob,  MaintenancePriority,  MaintenanceStatus, } from "../../api/maintenance";
import {  ApiError,  completeMaintenanceJob,  startMaintenanceJob,  updateMaintenanceJob,} from "../../api/maintenanceService";
import {  MaintenancePriorityBadge,  MaintenanceStatusBadge,} from ".";

interface Props {
  isOpen: boolean;
  job: MaintenanceJob | null;
  token: string;
  onClose: () => void;
  onUpdated: () => void;
  onUnauthorized: () => void;
}

export default function MaintenanceDetailsModal({
  isOpen,
  job,
  token,
  onClose,
  onUpdated,
  onUnauthorized,
}: Props) {
  const [saving, setSaving] = useState(false);

  const [status, setStatus] =
    useState<MaintenanceStatus>("queued");

  const [priority, setPriority] =
    useState<MaintenancePriority>("medium");

  const [issueReport, setIssueReport] =
    useState("");

  const [resolutionNotes, setResolutionNotes] =
    useState("");

  useEffect(() => {
    if (!job) return;

    setStatus(job.status);
    setPriority(job.priority);
    setIssueReport(job.issue_report);
    setResolutionNotes(
      job.resolution_notes ?? ""
    );
  }, [job]);

  if (!job) return null;
  const currentJob = job;
    async function handleStart() {
    try {
        setSaving(true);

        await startMaintenanceJob(currentJob.id, token);

        onUpdated();
        onClose();
    } catch (err) {
        if (err instanceof ApiError) {
        if (err.status === 401 || err.status === 403) {
            onUnauthorized();
            return;
        }

        alert(err.message);
        return;
        }

        alert("Failed to start maintenance job.");
    } finally {
        setSaving(false);
    }
    }

    async function handleUpdate() {
    try {
        setSaving(true);

        await updateMaintenanceJob(
        currentJob.id,
        {
            status,
            priority,
            issue_report: issueReport,
        },
        token
        );

        onUpdated();
        onClose();
    } catch (err) {
        if (err instanceof ApiError) {
        alert(err.message);
        return;
        }

        alert("Failed to update maintenance job.");
    } finally {
        setSaving(false);
    }
    }

    async function handleComplete() {
    try {
        setSaving(true);

        await completeMaintenanceJob(
        currentJob.id,
        {
            resolution_notes: resolutionNotes,
        },
        token
        );

        onUpdated();
        onClose();
    } catch (err) {
        if (err instanceof ApiError) {
        alert(err.message);
        return;
        }

        alert("Failed to complete maintenance job.");
    } finally {
        setSaving(false);
    }
    }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Maintenance Job #${job.id}`}
    >
      <div className="space-y-5">

        <div className="flex gap-3">
          <MaintenanceStatusBadge
            status={status}
          />

          <MaintenancePriorityBadge
            priority={priority}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Issue Report
          </label>

          <textarea
            rows={4}
            value={issueReport}
            disabled={
              status === "completed"
            }
            onChange={(e) =>
              setIssueReport(e.target.value)
            }
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Priority
          </label>

          <select
            disabled={
              status === "completed"
            }
            value={priority}
            onChange={(e) =>
              setPriority(
                e.target
                  .value as MaintenancePriority
              )
            }
            className="w-full rounded border px-3 py-2"
          >
            <option value="low">
              Low
            </option>

            <option value="medium">
              Medium
            </option>

            <option value="high">
              High
            </option>
          </select>
        </div>

        {(status === "in_progress" ||
          status === "completed") && (
          <div>
            <label className="block mb-1 font-medium">
              Resolution Notes
            </label>

            <textarea
              rows={4}
              value={resolutionNotes}
              disabled={
                status === "completed"
              }
              onChange={(e) =>
                setResolutionNotes(
                  e.target.value
                )
              }
              className="w-full rounded border px-3 py-2"
            />
          </div>
        )}

        <div className="flex justify-end gap-3">

          <button
            type="button"
            onClick={onClose}
            className="rounded border px-4 py-2"
          >
            Close
          </button>

          {status === "queued" && (
            <button
              onClick={handleStart}
              disabled={saving}
              className="rounded bg-blue-600 px-4 py-2 text-white"
            >
              Start Job
            </button>
          )}

          {status ===
            "in_progress" && (
            <>
              <button
                onClick={handleUpdate}
                disabled={saving}
                className="rounded bg-amber-500 px-4 py-2 text-white"
              >
                Save Changes
              </button>

              <button
                onClick={
                  handleComplete
                }
                disabled={saving}
                className="rounded bg-green-600 px-4 py-2 text-white"
              >
                Complete Job
              </button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}