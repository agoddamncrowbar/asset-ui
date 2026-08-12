interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  return (
    <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3">
      <button
        onClick={() =>
          onPageChange(currentPage - 1)
        }
        disabled={currentPage === 1}
        className="
          px-3 py-1.5 border border-slate-200
          text-xs font-semibold uppercase tracking-wide
          text-slate-600
          transition-colors
          hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200
          disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-600 disabled:hover:border-slate-200
        "
      >
        Previous
      </button>

      <span className="text-xs font-medium text-slate-400">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() =>
          onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        className="
          px-3 py-1.5 border border-slate-200
          text-xs font-semibold uppercase tracking-wide
          text-slate-600
          transition-colors
          hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200
          disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-600 disabled:hover:border-slate-200
        "
      >
        Next
      </button>
    </div>
  );
}