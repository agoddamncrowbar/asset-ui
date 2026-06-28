import type { Category } from "../../api/category";

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
    <div className="rounded-lg border bg-white overflow-hidden">
      <div className="border-b px-4 py-3">
        <h2 className="font-medium">
          Categories ({categories.length})
        </h2>
      </div>

      {loading ? (
        <div className="p-6">Loading...</div>
      ) : (
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left">
                Name
              </th>

              <th className="px-4 py-3 text-left">
                Depreciation
              </th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr
                key={category.id}
                onClick={() =>
                  onSelect(category.id)
                }
                className="
                  cursor-pointer border-t
                  hover:bg-slate-50
                "
              >
                <td className="px-4 py-3">
                  {category.name}
                </td>

                <td className="px-4 py-3">
                  {category.depreciation_period} months
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}