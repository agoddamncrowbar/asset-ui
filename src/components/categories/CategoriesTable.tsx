import type { Category } from "../../api/types/category";

interface Props {
  categories: Category[];
  loading: boolean;
  onSelect: (id: number) => void;
}

export default function CategoriesTable({
  categories,
  loading,
  onSelect,
}: Props) {
  return (
    <div className="border border-slate-200 bg-white overflow-hidden">
      <div className="border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-tight text-slate-900">
          Categories
        </h2>
        <span className="text-xs font-medium text-slate-400">
          {categories.length} total
        </span>
      </div>

      {loading ? (
        <div className="p-6 text-sm text-slate-500">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Name
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Depreciation
                </th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category) => (
                <tr
                  key={category.id}
                  onClick={() => onSelect(category.id)}
                  className="
                    cursor-pointer border-t border-slate-100
                    hover:bg-blue-50
                    transition-colors
                  "
                >
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {category.name}
                  </td>

                  <td className="px-4 py-3 text-slate-500">
                    {category.depreciation_period} months
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}