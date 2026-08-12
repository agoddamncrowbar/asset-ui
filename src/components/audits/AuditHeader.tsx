interface Props {
  onExport: () => void;
  loading?: boolean;
}

export default function AuditHeader({
  onExport,
  loading = false,
}: Props) {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
      <h1 className="text-sm font-semibold tracking-tight text-slate-900">
        Audit Logs
      </h1>

      <div className="flex gap-2">
        <button
          onClick={onExport}
          disabled={loading}
          className="
            px-3 py-1.5 border border-slate-200
            text-xs font-semibold uppercase tracking-wide
            text-slate-600
            transition-colors
            hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200
            disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-600 disabled:hover:border-slate-200
          "
        >
          {loading ? "Exporting..." : "Export CSV"}
        </button>
      </div>
    </div>
  );
}