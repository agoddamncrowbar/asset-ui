import type { ReportRow } from "./types";
import { formatValue, formatStatLabel } from "./format";

interface ReportStatGridProps {
  stat: ReportRow | null;
}

export default function ReportStatGrid({ stat }: ReportStatGridProps) {
  if (!stat) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-4 max-w-lg">
      {Object.entries(stat).map(([key, value]) => (
        <div key={key} className="border border-gray-200 rounded p-4">
          <p className="text-xs text-gray-500 mb-1">{formatStatLabel(key)}</p>
          <p className="text-2xl font-semibold text-blue-700">
            {formatValue(value)}
          </p>
        </div>
      ))}
    </div>
  );
}