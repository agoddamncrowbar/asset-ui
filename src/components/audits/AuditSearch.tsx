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
    <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          flex-1 border border-slate-200 px-3 py-2
          text-sm text-slate-900 placeholder:text-slate-400
          transition-colors
          focus:outline-none focus:border-blue-400
        "
      />

      <button
        onClick={onSearch}
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
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  );
}