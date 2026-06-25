import type { User } from "../../api/users";
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
    <div className="rounded-lg border bg-white p-5">
      <h2 className="mb-4 font-medium">
        User Details
      </h2>

      {!user ? (
        <p className="text-sm text-slate-500">
          Select a user from the table.
        </p>
      ) : (
        <>
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-medium">
                University ID:
              </span>{" "}
              {user.university_id}
            </div>

            <div>
              <span className="font-medium">
                Name:
              </span>{" "}
              {user.first_name} {user.last_name}
            </div>

            <div>
              <span className="font-medium">
                Email:
              </span>{" "}
              {user.email}
            </div>

            <div>
              <span className="font-medium">
                Phone:
              </span>{" "}
              {user.phone ?? "N/A"}
            </div>

            <div>
              <span className="font-medium">
                Role:
              </span>{" "}
              {user.role}
            </div>

            <div>
              <span className="font-medium">
                Status:
              </span>{" "}
              {user.status}
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