import type { User } from "../../api/types/users";
import UserActions from "./UserActions";

interface Props {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onToggleStatus: (user: User) => void;
  onDelete: (id: number) => void;
  onReturnAsset: (id: number) => void;
}

export default function UserDetailsModal({
  open,
  user,
  onClose,
  onToggleStatus,
  onDelete,
  onReturnAsset,
}: Props) {
  if (!open || !user) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        lg:hidden
        bg-slate-900/40 p-4
      "
    >
      <div
        className="
          w-full max-w-lg
          bg-white border border-slate-200
        "
      >
        <div className="flex items-center justify-between border-b border-slate-200 p-4">
          <h2 className="text-sm font-semibold tracking-tight text-slate-900">
            User Details
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-900 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-4">
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
        </div>
      </div>
    </div>
  );
}