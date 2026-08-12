import type { User } from "../../api/types/users";

interface Props {
  users: User[];
  loading: boolean;
  onSelect: (id: number) => void;
}

export default function UsersTable({
  users,
  loading,
  onSelect,
}: Props) {
  return (
    <div className="border border-slate-200 bg-white overflow-hidden">
      <div className="border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-tight text-slate-900">
          Users
        </h2>
        <span className="text-xs font-medium text-slate-400">
          {users.length} total
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
                  University ID
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Name
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Email
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Role
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => onSelect(user.id)}
                  className="
                    cursor-pointer border-t border-slate-100
                    hover:bg-blue-50
                    transition-colors
                  "
                >
                  <td className="px-4 py-3 text-slate-500">
                    {user.university_id}
                  </td>

                  <td className="px-4 py-3 font-medium text-slate-900">
                    {user.first_name} {user.last_name}
                  </td>

                  <td className="px-4 py-3 text-slate-500">
                    {user.email}
                  </td>

                  <td className="px-4 py-3 capitalize text-slate-600">
                    {user.role}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`
                        inline-flex items-center gap-1.5 px-2 py-0.5
                        text-xs font-medium capitalize
                        border
                        ${
                          user.status === "active"
                            ? "border-yellow-400 text-slate-700"
                            : "border-slate-200 text-slate-400"
                        }
                      `}
                    >
                      <span
                        className={`h-1.5 w-1.5 ${
                          user.status === "active"
                            ? "bg-yellow-400"
                            : "bg-slate-300"
                        }`}
                      />
                      {user.status}
                    </span>
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