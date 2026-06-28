import { useState } from "react";
import type { User } from "../../api/users";
import { searchUsers } from "../../api/userService";
import type { AssetInspectionForm } from "./types";

interface Props {
  form: AssetInspectionForm;
  token: string;
  updateForm: <K extends keyof AssetInspectionForm>(
    field: K,
    value: AssetInspectionForm[K]
  ) => void;
}

export default function MaintenanceAssignment({
  form,
  token,
  updateForm,
}: Props) {
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (!form.search.trim()) {
      updateForm("searchResults", []);
      return;
    }

    try {
      setLoading(true);

      const users = await searchUsers(form.search, token);

      const filtered = users.filter(
        (user: User) => user.role.toLowerCase() !== "student"
      );

      updateForm("searchResults", filtered);
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Failed to search users."
      );
    } finally {
      setLoading(false);
    }
  }

  function selectUser(user: User) {
    updateForm("assigned_to", user.id);
    updateForm("search", `${user.first_name} ${user.last_name}`);
    updateForm("searchResults", []);
  }

  return (
    <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50/70 p-5">
    <div className="mb-5 flex items-center justify-between">
        <div>
        <h4 className="text-lg font-semibold text-amber-900">
            Maintenance Assignment
        </h4>
        <p className="text-sm text-amber-700">
            This asset requires maintenance. Assign a technician and set the
            priority.
        </p>
        </div>
    </div>

    {/* Technician Search */}
    <div className="mb-5">
        <label className="mb-2 block text-sm font-semibold text-slate-700">
        Assign Technician
        </label>

        <div className="flex gap-3">
        <input
            type="text"
            value={form.search}
            onChange={(e) =>
            updateForm("search", e.target.value)
            }
            placeholder="Search by university ID or name..."
            className="
            flex-1 rounded-lg border border-slate-300
            bg-white px-4 py-2.5
            outline-none
            transition
            focus:border-blue-500
            focus:ring-2 focus:ring-blue-100
            "
        />

        <button
            type="button"
            onClick={handleSearch}
            disabled={loading}
            className="
            rounded-lg bg-blue-600
            px-5 py-2.5
            font-medium text-white
            transition
            hover:bg-blue-700
            disabled:cursor-not-allowed
            disabled:opacity-50
            "
        >
            {loading ? "Searching..." : "Search"}
        </button>
        </div>

        {form.searchResults.length > 0 && (
        <div
            className="
            mt-3 max-h-56 overflow-y-auto
            rounded-lg border border-slate-200
            bg-white shadow-sm
            "
        >
            {form.searchResults.map((user) => (
            <button
                key={user.id}
                type="button"
                onClick={() => selectUser(user)}
                className="
                flex w-full items-center justify-between
                border-b border-slate-100
                px-4 py-3 text-left
                transition
                hover:bg-slate-50
                last:border-b-0
                "
            >
                <div>
                <div className="font-medium text-slate-800">
                    {user.first_name} {user.last_name}
                </div>

                <div className="text-sm text-slate-500">
                    {user.role}
                </div>
                </div>

                <span className="text-sm font-medium text-blue-600">
                Select
                </span>
            </button>
            ))}
        </div>
        )}
    </div>

    {/* Priority */}
    <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
        Maintenance Priority
        </label>

        <select
        value={form.maintenance_priority}
        onChange={(e) =>
            updateForm(
            "maintenance_priority",
            e.target.value as "low" | "medium" | "high"
            )
        }
        className="
            w-full rounded-lg border border-slate-300
            bg-white px-4 py-2.5
            outline-none
            transition
            focus:border-blue-500
            focus:ring-2 focus:ring-blue-100
        "
        >
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
        </select>
    </div>
    </div>
  );
}