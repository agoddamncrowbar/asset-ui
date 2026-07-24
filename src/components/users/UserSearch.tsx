import type { Dispatch, SetStateAction } from "react";

interface Props {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  onSearch: () => void;
  onReset: () => void;
}

export default function UserSearch({
  search,
  setSearch,
  onSearch,
  onReset,
}: Props) {
  return (
    <div className="mb-6 border border-slate-200 bg-white p-4">
      <div className="flex gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          placeholder="Search by university ID or name..."
          className="
            flex-1 border border-slate-300
            px-4 py-2 text-sm outline-none
            placeholder:text-slate-400
            focus:border-blue-600
          "
        />

        <button
          onClick={onSearch}
          className="
            px-5 py-2 text-sm font-medium text-white
            bg-blue-700 hover:bg-blue-800
            transition-colors
          "
        >
          Search
        </button>

        <button
          onClick={onReset}
          className="
            px-5 py-2 text-sm font-medium
            border border-slate-300 text-slate-700
            hover:border-blue-600 hover:bg-blue-50
            transition-colors
          "
        >
          Reset
        </button>
      </div>
    </div>
  );
}