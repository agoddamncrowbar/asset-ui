import { useState } from "react";
import type { Assignment } from "../../api/types/assignments";

interface Props {
  isOpen: boolean;
  assignment: Assignment | null;
  onClose: () => void;
  onSubmit: (
    assignmentId: number,
    returnNotes: string,
    conditionStatus: string
  ) => Promise<void>;
}

export default function ReturnAssignmentModal({
  isOpen,
  assignment,
  onClose,
  onSubmit,
}: Props) {
  const [returnNotes, setReturnNotes] =
    useState("");

  const [conditionStatus, setConditionStatus] =
    useState("excellent");

  const [loading, setLoading] =
    useState(false);

  if (!isOpen || !assignment) return null;
  const currentAssignment = assignment;
  async function handleSubmit() {
    try {
      setLoading(true);

      await onSubmit(
        currentAssignment.id,
        returnNotes,
        conditionStatus
      );

      setReturnNotes("");
      setConditionStatus("excellent");

      onClose();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="border border-slate-200 bg-white w-full max-w-md overflow-hidden">
        <div className="border-b border-slate-200 px-4 py-3">
          <h2 className="text-sm font-semibold tracking-tight text-slate-900">
            Return Assignment #{assignment.id}
          </h2>
        </div>

        <div className="px-4 py-4 space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Condition
            </label>

            <select
              value={conditionStatus}
              onChange={(e) =>
                setConditionStatus(
                  e.target.value
                )
              }
              className="
                w-full border border-slate-200 px-3 py-2
                text-sm text-slate-900
                transition-colors
                focus:outline-none focus:border-blue-400
              "
            >
              <option value="excellent">
                Excellent
              </option>

              <option value="good">
                Good
              </option>

              <option value="fair">
                Fair
              </option>

              <option value="poor">
                Poor
              </option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Return Notes
            </label>

            <textarea
              value={returnNotes}
              onChange={(e) =>
                setReturnNotes(
                  e.target.value
                )
              }
              rows={4}
              className="
                w-full border border-slate-200 px-3 py-2
                text-sm text-slate-900 placeholder:text-slate-400
                transition-colors
                focus:outline-none focus:border-blue-400
              "
              placeholder="Returned in good condition..."
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-200 px-4 py-3">
          <button
            onClick={onClose}
            className="
              px-3 py-1.5 border border-slate-200
              text-xs font-semibold uppercase tracking-wide
              text-slate-600
              transition-colors
              hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="
              px-3 py-1.5 border border-slate-200
              text-xs font-semibold uppercase tracking-wide
              text-slate-600
              transition-colors
              hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200
              disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-600 disabled:hover:border-slate-200
            "
          >
            {loading
              ? "Processing..."
              : "Confirm Return"}
          </button>
        </div>
      </div>
    </div>
  );
}