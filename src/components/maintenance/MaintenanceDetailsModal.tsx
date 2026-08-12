import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import type {  MaintenanceJob,  MaintenancePriority,  MaintenanceStatus, } from "../../api/types/maintenance";
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
  const [isFixed, setIsFixed] = useState(false);
  const [isNotReparable, setIsNotReparable] = useState(false);
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

    const notes = job.resolution_notes ?? "";

    setResolutionNotes(notes);
    setIsFixed(notes === "fixed");
    setIsNotReparable(notes === "not_repairable");
  }, [job]);
  useEffect(() => {
    if (isFixed) {
      setResolutionNotes("fixed");
      setIsNotReparable(false);
    }
  }, [isFixed]);

  useEffect(() => {
    if (isNotReparable) {
      setResolutionNotes("not_repairable");
      setIsFixed(false);
    }
  }, [isNotReparable]);

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
      <div className="space-y-4">

        <div className="flex gap-2">
          <MaintenanceStatusBadge
            status={status}
          />

          <MaintenancePriorityBadge
            priority={priority}
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Issue Report
          </label>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={isFixed}
                disabled={status === "completed"}
                onChange={(e) => setIsFixed(e.target.checked)}
                className="h-3.5 w-3.5 border-slate-300 accent-blue-600"
              />
              Asset repaired (mark as Fixed)
            </label>

            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={isNotReparable}
                disabled={status === "completed"}
                onChange={(e) =>
                  setIsNotReparable(e.target.checked)
                }
                className="h-3.5 w-3.5 border-slate-300 accent-blue-600"
              />
              Asset is not reparable
            </label>

            {!isFixed && !isNotReparable && (
              <textarea
                rows={4}
                value={resolutionNotes}
                disabled={status === "completed"}
                onChange={(e) =>
                  setResolutionNotes(e.target.value)
                }
                placeholder="Enter resolution notes..."
                className="
                  w-full border border-slate-200 px-3 py-2
                  text-sm text-slate-900 placeholder:text-slate-400
                  transition-colors
                  focus:outline-none focus:border-blue-400
                  disabled:bg-slate-50 disabled:text-slate-400
                "
              />
            )}
</div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
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
            className="
              w-full border border-slate-200 px-3 py-2
              text-sm text-slate-900
              transition-colors
              focus:outline-none focus:border-blue-400
              disabled:bg-slate-50 disabled:text-slate-400
            "
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
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
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
              className="
                w-full border border-slate-200 px-3 py-2
                text-sm text-slate-900
                transition-colors
                focus:outline-none focus:border-blue-400
                disabled:bg-slate-50 disabled:text-slate-400
              "
            />
          </div>
        )}

        <div className="flex justify-end gap-2 border-t border-slate-200 pt-4">

          <button
            type="button"
            onClick={onClose}
            className="
              px-3 py-1.5 border border-slate-200
              text-xs font-semibold uppercase tracking-wide
              text-slate-600
              transition-colors
              hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200
            "
          >
            Close
          </button>

          {status === "queued" && (
            <button
              onClick={handleStart}
              disabled={saving}
              className="
                px-3 py-1.5 border border-slate-200
                text-xs font-semibold uppercase tracking-wide
                text-slate-600
                transition-colors
                hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200
                disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-600 disabled:hover:border-slate-200
              "
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
                className="
                  px-3 py-1.5 border border-slate-200
                  text-xs font-semibold uppercase tracking-wide
                  text-slate-600
                  transition-colors
                  hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200
                  disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-600 disabled:hover:border-slate-200
                "
              >
                Save Changes
              </button>

              <button
                onClick={
                  handleComplete
                }
                disabled={saving}
                className="
                  px-3 py-1.5 border border-yellow-400
                  text-xs font-semibold uppercase tracking-wide
                  text-slate-700
                  transition-colors
                  hover:bg-yellow-50
                  disabled:opacity-40 disabled:hover:bg-transparent
                "
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