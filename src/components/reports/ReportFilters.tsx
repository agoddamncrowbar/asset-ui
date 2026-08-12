import type { ReportDefinition } from "./types";

interface ReportFiltersProps {
  report: ReportDefinition;
  limit: number;
  from: string;
  to: string;
  onLimitChange: (value: number) => void;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
}

export default function ReportFilters({
  report,
  limit,
  from,
  to,
  onLimitChange,
  onFromChange,
  onToChange,
}: ReportFiltersProps) {
  if (!report.supportsLimit && !report.supportsDateRange) {
    return null;
  }

  return (
    <div className="flex items-center gap-3">
      {report.supportsLimit && (
        <label className="text-sm text-gray-600 flex items-center gap-2">
          Limit
          <input
            type="number"
            min={1}
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value) || 10)}
            className="w-20 border border-gray-300 rounded px-2 py-1 text-sm"
          />
        </label>
      )}

      {report.supportsDateRange && (
        <>
          <label className="text-sm text-gray-600 flex items-center gap-2">
            From
            <input
              type="date"
              value={from}
              onChange={(e) => onFromChange(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            />
          </label>

          <label className="text-sm text-gray-600 flex items-center gap-2">
            To
            <input
              type="date"
              value={to}
              onChange={(e) => onToChange(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            />
          </label>
        </>
      )}
    </div>
  );
}