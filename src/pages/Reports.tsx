import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../auth/useAuth";
import AppLoader from "../components/loading/AppLoader";

import ReportsSidebar from "../components/reports/ReportsSidebar";
import ReportFilters from "../components/reports/ReportFilters";
import ReportTable from "../components/reports/ReportsTable";
import ReportStatGrid from "../components/reports/Reportstatgrid";
import { REPORTS, REPORT_GROUPS } from "../components/reports/reportDefinitions";
import type { ReportRow } from "../components/reports/types";

export default function ReportsPage() {
  const { token } = useAuth();

  const [activeId, setActiveId] = useState(REPORTS[0].id);
  const [rows, setRows] = useState<ReportRow[]>([]);
  const [stat, setStat] = useState<ReportRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [limit, setLimit] = useState(10);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const activeReport = useMemo(
    () => REPORTS.find((r) => r.id === activeId)!,
    [activeId]
  );

  useEffect(() => {
    if (!token) return;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const params = {
          limit: activeReport.supportsLimit ? limit : undefined,
          from: activeReport.supportsDateRange ? from : undefined,
          to: activeReport.supportsDateRange ? to : undefined,
        };

        const result = await activeReport.fetcher(token!, params);

        if (activeReport.kind === "table") {
          setRows(result as ReportRow[]);
          setStat(null);
        } else {
          setStat(result as ReportRow);
          setRows([]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load report");
      } finally {
        setLoading(false);
      }
    }

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, token, limit, from, to]);

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Reports</h1>
        <p className="text-sm text-gray-500">
          Usage, maintenance, inventory, inspection, and request analytics.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <ReportsSidebar
          reports={REPORTS}
          groups={REPORT_GROUPS}
          activeId={activeId}
          onSelect={setActiveId}
        />

        <main className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">
              {activeReport.label}
            </h2>

            <ReportFilters
              report={activeReport}
              limit={limit}
              from={from}
              to={to}
              onLimitChange={setLimit}
              onFromChange={setFrom}
              onToChange={setTo}
            />
          </div>

          {loading ? (
            <AppLoader />
          ) : error ? (
            <div className="p-4 text-sm text-red-600 border border-red-200 rounded bg-red-50">
              {error}
            </div>
          ) : activeReport.kind === "stat" ? (
            <ReportStatGrid stat={stat} />
          ) : (
            <ReportTable columns={activeReport.columns!} rows={rows} />
          )}
        </main>
      </div>
    </div>
  );
}