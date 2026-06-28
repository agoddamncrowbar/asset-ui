interface Props {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  loading?: boolean;
  placeholder?: string;
}

export default function AuditSearch({
  value,
  onChange,
  onSearch,
  loading = false,
  placeholder = "Search audits...",
}: Props) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
      />

      <button
        onClick={onSearch}
        disabled={loading}
        className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  );
}