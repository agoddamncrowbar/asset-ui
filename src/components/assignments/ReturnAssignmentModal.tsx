import { useState } from "react";
import type { Assignment } from "../../api/assignments";

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

  async function handleSubmit() {
    try {
      setLoading(true);

      await onSubmit(
        assignment.id,
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
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          Return Assignment #{assignment.id}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">
              Condition
            </label>

            <select
              value={conditionStatus}
              onChange={(e) =>
                setConditionStatus(
                  e.target.value
                )
              }
              className="w-full border rounded px-3 py-2"
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
            <label className="block mb-1 text-sm font-medium">
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
              className="w-full border rounded px-3 py-2"
              placeholder="Returned in good condition..."
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded"
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