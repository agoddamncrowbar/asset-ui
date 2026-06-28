import type { Department } from "../../api/department";

interface Props {
  departments: Department[];
  loading: boolean;
  onSelect: (id: number) => void;
}

export default function DepartmentsTable({
  departments,
  loading,
  onSelect,
}: Props) {
  return (
    <div className="rounded-lg border bg-white overflow-hidden">
      <div className="border-b px-4 py-3">
        <h2 className="font-medium">
          Departments ({departments.length})
        </h2>
      </div>

      {loading ? (
        <div className="p-6">
          Loading...
        </div>
      ) : (
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left">
                Code
              </th>

              <th className="px-4 py-3 text-left">
                Name
              </th>
            </tr>
          </thead>

          <tbody>
            {departments.map((dept) => (
              <tr
                key={dept.id}
                onClick={() => onSelect(dept.id)}
                className="
                  cursor-pointer border-t
                  hover:bg-slate-50
                "
              >
                <td className="px-4 py-3">
                  {dept.code}
                </td>

                <td className="px-4 py-3">
                  {dept.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}