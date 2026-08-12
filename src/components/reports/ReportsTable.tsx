import type { ReportColumn, ReportRow } from "./types";
import { formatValue } from "./format";

interface ReportTableProps {
  columns: ReportColumn[];
  rows: ReportRow[];
}

export default function ReportTable({ columns, rows }: ReportTableProps) {
  if (rows.length === 0) {
    return <p className="text-sm text-gray-500">No data for this report.</p>;
  }

  return (
    <div className="overflow-x-auto border border-gray-200 rounded">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-left px-4 py-2 font-medium text-gray-600"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-gray-100 hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2 text-gray-700">
                  {formatValue(row[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}