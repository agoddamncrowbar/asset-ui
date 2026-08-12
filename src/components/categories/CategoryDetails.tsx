import type { Category } from "../../api/types/category";

interface Props {
  category: Category | null;
  onDelete: (id: number) => void;
}

const labelClasses =
  "text-xs font-semibold uppercase tracking-wide text-slate-500";

export default function CategoryDetails({
  category,
  onDelete,
}: Props) {
  return (
    <div className="border border-slate-200 bg-white overflow-hidden">
      <div className="border-b border-slate-200 px-4 py-3">
        <h2 className="text-sm font-semibold tracking-tight text-slate-900">
          Category Details
        </h2>
      </div>

      <div className="p-5">
        {!category ? (
          <p className="text-sm text-slate-500">Select a category.</p>
        ) : (
          <>
            <div className="space-y-4 text-sm">
              <div>
                <p className={labelClasses}>Name</p>
                <p className="mt-1 text-slate-900">{category.name}</p>
              </div>

              <div>
                <p className={labelClasses}>Description</p>
                <p className="mt-1 text-slate-900">
                  {category.description}
                </p>
              </div>

              <div>
                <p className={labelClasses}>Depreciation Period</p>
                <p className="mt-1 text-slate-900">
                  {category.depreciation_period} months
                </p>
              </div>
            </div>

            <div className="mt-6 border-t border-slate-200 pt-4">
              <button
                onClick={() => onDelete(category.id)}
                className="
                  px-4 py-2 text-sm font-medium
                  bg-red-600 text-white
                  hover:bg-red-700
                  transition-colors
                "
              >
                Delete Category
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}