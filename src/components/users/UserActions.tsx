import type { User } from "../../api/users";

interface Props {
  userId: number;
  user: User;
  onToggleStatus: (user: User) => void;
  onDelete: (id: number) => void;
  onReturnAsset: (id: number) => void;
}

export default function UserActions({
  userId,
  user,
  onToggleStatus,
  onDelete,
  onReturnAsset,
}: Props) {
  return (
    <div className="mt-6 border-t border-slate-200 pt-4">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Actions
      </h3>

      <div className="flex flex-col gap-2">
        <button
          onClick={() => onToggleStatus(user)}
          className={`
            px-4 py-2 text-sm font-medium border transition-colors
            ${
              user.status === "suspended"
                ? "border-slate-300 text-slate-700 hover:border-yellow-400 hover:bg-yellow-50"
                : "border-slate-300 text-slate-700 hover:border-yellow-400 hover:bg-yellow-50"
            }
          `}
        >
          {user.status === "suspended" ? "Activate User" : "Suspend User"}
        </button>

        <button
          onClick={() => onReturnAsset(userId)}
          className="
            px-4 py-2 text-sm font-medium
            border border-slate-300 text-slate-700
            hover:border-blue-600 hover:bg-blue-50
            transition-colors
          "
        >
          Return Asset
        </button>

        <button
          onClick={() => onDelete(userId)}
          className="
            px-4 py-2 text-sm font-medium
            border border-red-200 text-red-600
            hover:border-red-500 hover:bg-red-50
            transition-colors
          "
        >
          Delete User
        </button>
      </div>
    </div>
  );
}