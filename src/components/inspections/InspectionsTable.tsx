import type { Inspection } from "../../api/types/inspection";

interface Props {
  inspections: Inspection[];
  loading: boolean;
  onStart: (inspection: Inspection) => void;
  onComplete: (inspection: Inspection) => void;
  onCancel: (inspection: Inspection) => void;
  onPostResults: (inspection: Inspection) => void;
}

const statusStyles: Record<string, { dot: string; text: string }> = {
  scheduled: { dot: "bg-yellow-400", text: "text-slate-700" },
  in_progress: { dot: "bg-blue-500", text: "text-slate-700" },
  completed: { dot: "bg-emerald-500", text: "text-slate-700" },
  cancelled: { dot: "bg-slate-300", text: "text-slate-400" },
};

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
      <div className="border border-slate-200 bg-white text-center py-8 text-sm text-slate-500">
        Loading inspections...
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-slate-200 bg-white">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Code
            </th>
            <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Scheduled
            </th>
            <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Status
            </th>
            <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Notes
            </th>
            <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Completed
            </th>
            <th className="px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {inspections.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="text-center py-8 text-sm text-slate-500"
              >
                No inspections found.
              </td>
            </tr>
          )}

          {inspections.map((inspection) => {
            const style =
              statusStyles[inspection.status] ?? statusStyles.cancelled;

            return (
              <tr
                key={inspection.id}
                className="border-t border-slate-100 hover:bg-blue-50 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-slate-900">
                  {inspection.inspection_code}
                </td>

                <td className="px-4 py-3 text-slate-500">
                  {inspection.scheduled_date}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium capitalize border border-slate-200 ${style.text}`}
                  >
                    <span className={`h-1.5 w-1.5 ${style.dot}`} />
                    {inspection.status.replace("_", " ")}
                  </span>
                </td>

                <td className="px-4 py-3 text-slate-500 max-w-xs truncate">
                  {inspection.notes}
                </td>

                <td className="px-4 py-3 text-slate-500">
                  {inspection.completed_date ?? "-"}
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2 flex-wrap">
                    {inspection.status === "scheduled" && (
                      <>
                        <button
                          onClick={() => onStart(inspection)}
                          className="px-3 py-1 text-xs font-medium text-white bg-blue-700 hover:bg-blue-800 transition-colors"
                        >
                          Start
                        </button>

                        <button
                          onClick={() => onCancel(inspection)}
                          className="px-3 py-1 text-xs font-medium border border-red-200 text-red-600 hover:border-red-500 hover:bg-red-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </>
                    )}

                    {inspection.status === "in_progress" && (
                      <>
                        <button
                          onClick={() => onComplete(inspection)}
                          className="px-3 py-1 text-xs font-medium text-white bg-blue-700 hover:bg-blue-800 transition-colors"
                        >
                          Complete
                        </button>

                        <button
                          onClick={() => onCancel(inspection)}
                          className="px-3 py-1 text-xs font-medium border border-red-200 text-red-600 hover:border-red-500 hover:bg-red-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </>
                    )}

                    {inspection.status === "completed" && (
                      <button
                        onClick={() => onPostResults(inspection)}
                        className="px-3 py-1 text-xs font-medium border border-slate-300 text-slate-700 hover:border-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        Record Asset Results
                      </button>
                    )}

                    {inspection.status === "cancelled" && (
                      <span className="text-xs text-slate-400">
                        No actions available
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}