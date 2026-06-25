import type { User } from "../../api/users";

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
    <div className="rounded-lg border bg-white overflow-hidden">
      <div className="border-b px-4 py-3">
        <h2 className="font-medium">
          Users ({users.length})
        </h2>
      </div>

      {loading ? (
        <div className="p-6">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-3 text-left">
                  University ID
                </th>
                <th className="px-4 py-3 text-left">
                  Name
                </th>
                <th className="px-4 py-3 text-left">
                  Email
                </th>
                <th className="px-4 py-3 text-left">
                  Role
                </th>
                <th className="px-4 py-3 text-left">
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
                    cursor-pointer border-t
                    hover:bg-slate-50
                  "
                >
                  <td className="px-4 py-3">
                    {user.university_id}
                  </td>

                  <td className="px-4 py-3">
                    {user.first_name} {user.last_name}
                  </td>

                  <td className="px-4 py-3">
                    {user.email}
                  </td>

                  <td className="px-4 py-3 capitalize">
                    {user.role}
                  </td>

                  <td className="px-4 py-3 capitalize">
                    {user.status}
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