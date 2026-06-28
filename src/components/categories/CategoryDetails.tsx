import type { Category } from "../../api/category";

interface Props {
  category: Category | null;
  onDelete: (id: number) => void;
}

export default function CategoryDetails({
  category,
  onDelete,
}: Props) {
  return (
    <div className="rounded-lg border bg-white p-5">
      <h2 className="mb-4 font-medium">
        Category Details
      </h2>

      {!category ? (
        <p>Select a category.</p>
      ) : (
        <>
          <div className="space-y-3 text-sm">
            <div>
              <strong>Name:</strong>{" "}
              {category.name}
            </div>

            <div>
              <strong>Description:</strong>{" "}
              {category.description}
            </div>

            <div>
              <strong>Depreciation Period:</strong>{" "}
              {category.depreciation_period} months
            </div>
          </div>

          <div className="mt-6 border-t pt-4">
            <button
              onClick={() =>
                onDelete(category.id)
              }
              className="
                rounded-lg bg-red-600
                px-4 py-2 text-white
                hover:bg-red-700
              "
            >
              Delete Category
            </button>
          </div>
        </>
      )}
    </div>
  );
}