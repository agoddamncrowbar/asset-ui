import type { User } from "../../api/users";
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
        bg-black/40 p-4
      "
    >
      <div
        className="
          w-full max-w-lg
          rounded-xl bg-white
          shadow-xl
        "
      >
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="font-semibold">
            User Details
          </h2>

          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-900"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3 p-4 text-sm">
          <div>
            <strong>University ID:</strong>{" "}
            {user.university_id}
          </div>

          <div>
            <strong>Name:</strong>{" "}
            {user.first_name} {user.last_name}
          </div>

          <div>
            <strong>Email:</strong>{" "}
            {user.email}
          </div>

          <div>
            <strong>Phone:</strong>{" "}
            {user.phone ?? "N/A"}
          </div>

          <div>
            <strong>Role:</strong>{" "}
            {user.role}
          </div>

          <div>
            <strong>Status:</strong>{" "}
            {user.status}
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