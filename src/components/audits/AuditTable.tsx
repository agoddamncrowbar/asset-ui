// components/audits/AuditTable.tsx

import type { AuditSummary } from "../../api/audit";

interface Props {
  audits: AuditSummary[];
  onView: (id: number) => void;
}

export default function AuditTable({
  audits,
  onView,
}: Props) {
  return (
    <div className="overflow-x-auto border border-blue-200 rounded-lg">
      <table className="min-w-full text-sm">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3 text-left">Time</th>
            <th className="p-3 text-left">Action</th>
            <th className="p-3 text-left">Entity</th>
            <th className="p-3 text-left">Summary</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {audits.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="p-6 text-center text-gray-500"
              >
                No audit logs found.
              </td>
            </tr>
          ) : (
            audits.map((audit, idx) => (
              <tr
                key={audit.id}
                className={
                  idx % 2 === 0
                    ? "bg-white"
                    : "bg-yellow-50"
                }
              >
                <td className="p-3 whitespace-nowrap">
                  {audit.timestamp}
                </td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      audit.action === "CREATE"
                        ? "bg-green-100 text-green-700"
                        : audit.action === "UPDATE"
                        ? "bg-blue-100 text-blue-700"
                        : audit.action === "DELETE"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {audit.action}
                  </span>
                </td>

                <td className="p-3">
                  {audit.entity_type}
                </td>

                <td className="p-3">
                  {audit.summary}
                </td>

                <td className="p-3">
                  <button
                    onClick={() => onView(audit.id)}
                    className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}