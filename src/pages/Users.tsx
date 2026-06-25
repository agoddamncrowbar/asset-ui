import { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";
import { getUser, getUsers, searchUsers } from "../api/userService";
import type { User } from "../api/users";
import { activateUser, suspendUser, createUser, deleteUser} from "../api/userService";
import UserSearch from "../components/users/UserSearch";
import UsersTable from "../components/users/UsersTable";
import UserDetails from "../components/users/UserDetails";
import UserDetailsModal from "../components/users/UserDetailsModal";
import CreateUserModal from "../components/users/CreateUserModal";

export default function UsersPage() {
    const { token } = useAuth();

    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [creatingUser, setCreatingUser] = useState(false);
    const { user } = useAuth();
    useEffect(() => {
        loadUsers();
    }, []);
    async function handleDelete(id: number) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmed) {
            return;
        }
        
        if (user?.id === id) {
        alert("You cannot delete your own account.");
        return;
        }

        try {
            await deleteUser(id, token!);

            setUsers((current) =>
            current.filter((user) => user.id !== id)
            );

            if (selectedUser?.id === id) {
            setSelectedUser(null);
            }

            setIsModalOpen(false);
        } catch (error) {
            console.error(error);

            alert(
            error instanceof Error
                ? error.message
                : "Failed to delete user"
            );
        }
    }
  async function handleCreateUser(data: any) {
    try {
        setCreatingUser(true);

        await createUser(data, token!);

        setCreateModalOpen(false);

        await loadUsers();
    } catch (error) {
        console.error(error);

        alert(
        error instanceof Error
            ? error.message
            : "Failed to create user"
        );
    } finally {
        setCreatingUser(false);
    }
    }
  async function loadUsers() {
    try {
      setLoading(true);
      setUsers(await getUsers(token!));
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch() {
    if (!search.trim()) {
      loadUsers();
      return;
    }

    setUsers(await searchUsers(search, token!));
  }

  async function selectUser(id: number) {
    setSelectedUser(await getUser(id, token!));
    setIsModalOpen(true);
  }

  async function handleToggleStatus(user: User) {
    try {
        if (user.status === "suspended") {
        await activateUser(user.id, token!);
        } else {
        await suspendUser(user.id, token!);
        }

        const updated = await getUser(user.id, token!);

        setSelectedUser(updated);

        setUsers((current) =>
        current.map((u) =>
            u.id === user.id ? updated! : u
        )
        );
    } catch (err) {
        console.error(err);
        alert("Failed to update user status");
    }
    }

    async function handleReturnAsset(id: number) {
        console.log(id);
    }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl p-6">
        <div className="mb-8 flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-semibold">
            User Management
            </h1>

            <p className="mt-1 text-sm text-slate-500">
            Search, view and manage users.
            </p>
        </div>

        <button
            onClick={() => setCreateModalOpen(true)}
            className="
            rounded-lg bg-blue-600
            px-4 py-2 text-white
            hover:bg-blue-700
            "
        >
            Create User
        </button>
        </div>

        <UserSearch
          search={search}
          setSearch={setSearch}
          onSearch={handleSearch}
          onReset={loadUsers}
        />

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <UsersTable
            users={users}
            loading={loading}
            onSelect={selectUser}
          />
            <UserDetailsModal
                open={isModalOpen}
                user={selectedUser}
                onClose={() => setIsModalOpen(false)}
                onToggleStatus={handleToggleStatus}
                onDelete={handleDelete}
                onReturnAsset={handleReturnAsset}
            />
          <div className="hidden lg:block">
            <UserDetails
                user={selectedUser}
                onToggleStatus={handleToggleStatus}
                onDelete={handleDelete}
                onReturnAsset={handleReturnAsset}
                />
            </div>
            <CreateUserModal
                open={createModalOpen}
                loading={creatingUser}
                onClose={() => setCreateModalOpen(false)}
                onSubmit={handleCreateUser}
            />
        </div>
      </div>
    </div>
  );
}