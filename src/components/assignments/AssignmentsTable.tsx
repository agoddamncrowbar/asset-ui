import type { Assignment } from "../../api/types/assignments";

interface Props {
  assignments: Assignment[];
  onReturn: (assignment: Assignment) => void;
}

export default function AssignmentsTable({
  assignments, onReturn
}: Props) {
  return (
    <div className="border border-slate-200 bg-white overflow-hidden">
      <div className="border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-tight text-slate-900">
          Assignments
        </h2>
        <span className="text-xs font-medium text-slate-400">
          {assignments.length} total
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                ID
              </th>

              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Asset ID
              </th>

              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Assigned To
              </th>

              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Assigned By
              </th>

              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Assigned At
              </th>

              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Expected Return
              </th>

              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Returned At
              </th>

              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {assignments.map((assignment) => (
              <tr
                key={assignment.id}
                className="border-t border-slate-100 hover:bg-blue-50 transition-colors"
              >
                <td className="px-4 py-3 text-slate-500">
                  #{assignment.id}
                </td>

                <td className="px-4 py-3 font-medium text-slate-900">
                  {assignment.asset_id}
                </td>

                <td className="px-4 py-3 text-slate-600">
                  {assignment.assigned_to}
                </td>

                <td className="px-4 py-3 text-slate-600">
                  {assignment.assigned_by}
                </td>

                <td className="px-4 py-3 text-slate-500">
                  {new Date(
                    assignment.assigned_at
                  ).toLocaleDateString()}
                </td>

                <td className="px-4 py-3 text-slate-500">
                  {assignment.expected_return_date
                    ? new Date(
                        assignment.expected_return_date
                      ).toLocaleDateString()
                    : "-"}
                </td>

                <td className="px-4 py-3 text-slate-500">
                  {assignment.returned_at
                    ? new Date(
                        assignment.returned_at
                      ).toLocaleDateString()
                    : "-"}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`
                      inline-flex items-center gap-1.5 px-2 py-0.5
                      text-xs font-medium capitalize
                      border
                      ${
                        assignment.status === "active"
                          ? "border-yellow-400 text-slate-700"
                          : "border-slate-200 text-slate-400"
                      }
                    `}
                  >
                    <span
                      className={`h-1.5 w-1.5 ${
                        assignment.status === "active"
                          ? "bg-yellow-400"
                          : "bg-slate-300"
                      }`}
                    />
                    {assignment.status}
                  </span>
                </td>

                <td className="px-4 py-3">
                  {assignment.status === "active" && (
                    <button
                      onClick={() => onReturn(assignment)}
                      className="
                        px-2.5 py-1 border border-slate-200
                        text-xs font-semibold uppercase tracking-wide
                        text-slate-600
                        transition-colors
                        hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200
                      "
                    >
                      Return
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {assignments.length === 0 && (
          <div className="p-8 text-center text-sm text-slate-500">
            No assignments found.
          </div>
        )}
      </div>
    </div>
  );
}