import type { Assignment } from "../../api/assignments";

interface Props {
  assignments: Assignment[];
  onReturn: (assignment: Assignment) => void;
}

export default function AssignmentsTable({
  assignments, onReturn
}: Props) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                ID
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Asset ID
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Assigned To
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Assigned By
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Assigned At
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Expected Return
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Returned At
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {assignments.map((assignment) => (
              <tr
                key={assignment.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="px-4 py-3 text-sm">
                  #{assignment.id}
                </td>

                <td className="px-4 py-3 text-sm">
                  {assignment.asset_id}
                </td>

                <td className="px-4 py-3 text-sm">
                  {assignment.assigned_to}
                </td>

                <td className="px-4 py-3 text-sm">
                  {assignment.assigned_by}
                </td>

                <td className="px-4 py-3 text-sm">
                  {new Date(
                    assignment.assigned_at
                  ).toLocaleDateString()}
                </td>

                <td className="px-4 py-3 text-sm">
                  {assignment.expected_return_date
                    ? new Date(
                        assignment.expected_return_date
                      ).toLocaleDateString()
                    : "-"}
                </td>

                <td className="px-4 py-3 text-sm">
                  {assignment.returned_at
                    ? new Date(
                        assignment.returned_at
                      ).toLocaleDateString()
                    : "-"}
                </td>

                <td className="px-4 py-3 text-sm">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                      assignment.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {assignment.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                    {assignment.status === "active" && (
                        <button
                        onClick={() => onReturn(assignment)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
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
          <div className="p-8 text-center text-gray-500">
            No assignments found.
          </div>
        )}
      </div>
    </div>
  );
}