import type { AuditSummary } from "../../api/types/audit";

interface Props {
  audits: AuditSummary[];
  onView: (id: number) => void;
}

export default function AuditTable({ audits, onView }: Props) {
  return (
    <div className="border border-slate-200 bg-white overflow-hidden">
      <div className="border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-tight text-slate-900">
          Audit Log
        </h2>
        <span className="text-xs font-medium text-slate-400">
          {audits.length} total
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Time
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Action
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Entity
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Summary
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {audits.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-sm text-slate-500"
                >
                  No audit logs found.
                </td>
              </tr>
            ) : (
              audits.map((audit) => (
                <tr
                  key={audit.id}
                  className="
                    border-t border-slate-100
                    hover:bg-blue-50
                    transition-colors
                  "
                >
                  <td className="px-4 py-3 whitespace-nowrap text-slate-500">
                    {audit.timestamp}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`
                        inline-flex items-center gap-1.5 px-2 py-0.5
                        text-xs font-medium
                        border
                        ${
                          audit.action === "CREATE"
                            ? "border-green-400 text-slate-700"
                            : audit.action === "UPDATE"
                            ? "border-blue-400 text-slate-700"
                            : audit.action === "DELETE"
                            ? "border-red-400 text-slate-700"
                            : "border-slate-200 text-slate-400"
                        }
                      `}
                    >
                      <span
                        className={`h-1.5 w-1.5 ${
                          audit.action === "CREATE"
                            ? "bg-green-400"
                            : audit.action === "UPDATE"
                            ? "bg-blue-400"
                            : audit.action === "DELETE"
                            ? "bg-red-400"
                            : "bg-slate-300"
                        }`}
                      />
                      {audit.action}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-slate-600">
                    {audit.entity_type}
                  </td>

                  <td className="px-4 py-3 text-slate-500">
                    {audit.summary}
                  </td>

                  <td className="px-4 py-3">
                    <button
                      onClick={() => onView(audit.id)}
                      className="
                        px-2.5 py-1 text-xs font-medium
                        text-slate-600
                        border border-slate-200
                        hover:bg-slate-50
                        transition-colors
                      "
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
    </div>
  );
}