interface Props {
  onExport: () => void;
  loading?: boolean;
}

export default function AuditHeader({
  onExport,
  loading = false,
}: Props) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-bold text-blue-700">
        Audit Logs
      </h1>

      <div className="flex gap-2">
        <button
          onClick={onExport}
          disabled={loading}
          className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Exporting..." : "Export CSV"}
        </button>
      </div>
    </div>
  );
}