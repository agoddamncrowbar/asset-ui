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
    <div className="mb-6 rounded-lg border bg-white p-4">
      <div className="flex gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by university ID or name..."
          className="
            flex-1 rounded-lg border border-slate-300
            px-4 py-2 outline-none
            focus:border-blue-500
          "
        />

        <button
          onClick={onSearch}
          className="
            rounded-lg bg-blue-600 px-5 py-2
            text-white hover:bg-blue-700
          "
        >
          Search
        </button>

        <button
          onClick={onReset}
          className="
            rounded-lg border px-5 py-2
            hover:bg-slate-50
          "
        >
          Reset
        </button>
      </div>
    </div>
  );
}