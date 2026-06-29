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
    <div className="mt-6 border-t pt-4">
      <h3 className="mb-3 font-medium">
        Actions
      </h3>

      <div className="flex flex-col gap-2">
        <button
            onClick={() => onToggleStatus(user)}
            className={`
                rounded-lg px-4 py-2 text-white
                ${
                user.status === "suspended"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-yellow-500 hover:bg-yellow-600"
                }
            `}
            >
            {user.status === "suspended"
                ? "Activate User"
                : "Suspend User"}
            </button>

        <button
          onClick={() => onDelete(userId)}
          className="
            rounded-lg bg-red-600 px-4 py-2
            text-white hover:bg-red-700
          "
        >
          Delete User
        </button>

        <button
          onClick={() => onReturnAsset(userId)}
          className="
            rounded-lg bg-green-600 px-4 py-2
            text-white hover:bg-green-700
          "
        >
          Return Asset
        </button>
      </div>
    </div>
  );
}