import type { Department } from "../../api/department";

interface Props {
  department: Department | null;
  onDelete: (id: number) => void;
}

export default function DepartmentDetails({
  department,
  onDelete,
}: Props) {
  return (
    <div className="rounded-lg border bg-white p-5">
      <h2 className="mb-4 font-medium">
        Department Details
      </h2>

      {!department ? (
        <p>Select a department.</p>
      ) : (
        <>
          <div className="space-y-3 text-sm">
            <div>
              <strong>Name:</strong>{" "}
              {department.name}
            </div>

            <div>
              <strong>Code:</strong>{" "}
              {department.code}
            </div>

            <div>
              <strong>Description:</strong>{" "}
              {department.description}
            </div>
          </div>

          <div className="mt-6 border-t pt-4">
            <button
              onClick={() =>
                onDelete(department.id)
              }
              className="
                rounded-lg bg-red-600
                px-4 py-2 text-white
                hover:bg-red-700
              "
            >
              Delete Department
            </button>
          </div>
        </>
      )}
    </div>
  );
}