import type { User } from "../../api/types/users";
import UserActions from "./UserActions";

interface Props {
  user: User | null;
  onToggleStatus: (user: User) => void;
  onDelete: (id: number) => void;
  onReturnAsset: (id: number) => void;
}

export default function UserDetails({
  user,
  onToggleStatus,
  onDelete,
  onReturnAsset,
}: Props) {
  return (
    <div className="border border-slate-200 bg-white p-5">
      <h2 className="mb-4 text-sm font-semibold tracking-tight text-slate-900">
        User Details
      </h2>

      {!user ? (
        <p className="text-sm text-slate-500">
          Select a user from the table.
        </p>
      ) : (
        <>
          <div className="divide-y divide-slate-100 text-sm">
            <div className="flex justify-between py-2.5 first:pt-0">
              <span className="text-slate-500">University ID</span>
              <span className="font-medium text-slate-900">
                {user.university_id}
              </span>
            </div>

            <div className="flex justify-between py-2.5">
              <span className="text-slate-500">Name</span>
              <span className="font-medium text-slate-900">
                {user.first_name} {user.last_name}
              </span>
            </div>

            <div className="flex justify-between py-2.5">
              <span className="text-slate-500">Email</span>
              <span className="font-medium text-slate-900">
                {user.email}
              </span>
            </div>

            <div className="flex justify-between py-2.5">
              <span className="text-slate-500">Phone</span>
              <span className="font-medium text-slate-900">
                {user.phone ?? "N/A"}
              </span>
            </div>

            <div className="flex justify-between py-2.5">
              <span className="text-slate-500">Role</span>
              <span className="font-medium capitalize text-slate-900">
                {user.role}
              </span>
            </div>

            <div className="flex justify-between py-2.5 last:pb-0">
              <span className="text-slate-500">Status</span>
              <span className="inline-flex items-center gap-1.5 font-medium capitalize text-slate-900">
                <span
                  className={`h-1.5 w-1.5 ${
                    user.status === "active"
                      ? "bg-yellow-400"
                      : "bg-slate-300"
                  }`}
                />
                {user.status}
              </span>
            </div>
          </div>

          <UserActions
            userId={user.id}
            user={user}
            onToggleStatus={onToggleStatus}
            onDelete={onDelete}
            onReturnAsset={onReturnAsset}
          />
        </>
      )}
    </div>
  );
}