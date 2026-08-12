import type { ReportDefinition } from "./types";

interface ReportsSidebarProps {
  reports: ReportDefinition[];
  groups: string[];
  activeId: string;
  onSelect: (id: string) => void;
}

export default function ReportsSidebar({
  reports,
  groups,
  activeId,
  onSelect,
}: ReportsSidebarProps) {
  return (
    <aside className="w-full md:w-64 shrink-0 border border-slate-200 bg-white md:sticky md:top-6 md:max-h-[calc(100vh-3rem)] md:overflow-y-auto">
      {/* Mobile / narrow viewport: grouped dropdown */}
      <div className="md:hidden border-b border-slate-200 p-3">
        <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">
          Report
        </label>

        <select
          value={activeId}
          onChange={(e) => onSelect(e.target.value)}
          className="w-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-400"
        >
          {groups.map((group) => (
            <optgroup key={group} label={group}>
              {reports
                .filter((r) => r.group === group)
                .map((report) => (
                  <option key={report.id} value={report.id}>
                    {report.label}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
      </div>

      {/* Desktop: vertical rail */}
      <div className="hidden md:block">
        {groups.map((group) => (
          <div
            key={group}
            className="border-b border-slate-100 last:border-b-0 py-3"
          >
            <p className="px-4 pb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              {group}
            </p>

            <ul>
              {reports
                .filter((r) => r.group === group)
                .map((report) => {
                  const isActive = report.id === activeId;

                  return (
                    <li key={report.id}>
                      <button
                        onClick={() => onSelect(report.id)}
                        className={`w-full text-left px-4 py-2 text-sm border-l-2 transition-colors ${
                          isActive
                            ? "border-blue-600 bg-blue-50 text-blue-700 font-medium"
                            : "border-transparent text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                        }`}
                      >
                        {report.label}
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}