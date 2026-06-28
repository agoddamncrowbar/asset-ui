import type { Inspection } from "../../api/inspection";

interface Props {
  inspections: Inspection[];
  loading: boolean;
  onStart: (inspection: Inspection) => void;
  onComplete: (inspection: Inspection) => void;
  onCancel: (inspection: Inspection) => void;
  onPostResults: (inspection: Inspection) => void;
}

export default function InspectionsTable({
  inspections,
  loading,
  onStart,
  onComplete,
  onCancel,
  onPostResults,
}: Props) {
  if (loading) {
    return (
      <div className="text-center py-8">
        Loading inspections...
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Code</th>
            <th className="px-4 py-3 text-left">Scheduled</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Notes</th>
            <th className="px-4 py-3 text-left">Completed</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {inspections.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="text-center py-8 text-gray-500"
              >
                No inspections found.
              </td>
            </tr>
          )}

          {inspections.map((inspection) => (
            <tr
              key={inspection.id}
              className="border-t"
            >
              <td className="px-4 py-3 font-medium">
                {inspection.inspection_code}
              </td>

              <td className="px-4 py-3">
                {inspection.scheduled_date}
              </td>

              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold
                    ${
                      inspection.status === "scheduled"
                        ? "bg-yellow-100 text-yellow-800"
                        : inspection.status === "in_progress"
                        ? "bg-blue-100 text-blue-800"
                        : inspection.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                >
                  {inspection.status.replace("_", " ")}
                </span>
              </td>

              <td className="px-4 py-3">
                {inspection.notes}
              </td>

              <td className="px-4 py-3">
                {inspection.completed_date ?? "-"}
              </td>

              <td className="px-4 py-3">
                <div className="flex justify-center gap-2 flex-wrap">
                  {inspection.status === "scheduled" && (
                    <>
                      <button
                        onClick={() => onStart(inspection)}
                        className="px-3 py-1 rounded bg-blue-600 text-white"
                      >
                        Start
                      </button>

                      <button
                        onClick={() => onCancel(inspection)}
                        className="px-3 py-1 rounded bg-red-600 text-white"
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  {inspection.status === "in_progress" && (
                    <>
                      <button
                        onClick={() => onComplete(inspection)}
                        className="px-3 py-1 rounded bg-green-600 text-white"
                      >
                        Complete
                      </button>

                      <button
                        onClick={() => onCancel(inspection)}
                        className="px-3 py-1 rounded bg-red-600 text-white"
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  {inspection.status === "completed" && (
                    <button
                      onClick={() => onPostResults(inspection)}
                      className="px-3 py-1 rounded bg-indigo-600 text-white"
                    >
                      Record Asset Results
                    </button>
                  )}

                  {inspection.status === "cancelled" && (
                    <span className="text-gray-500 text-sm">
                      No actions available
                    </span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}