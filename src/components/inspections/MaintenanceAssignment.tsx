import { useState } from "react";
import type { User } from "../../api/types/users";
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
    <div className="mt-6 border border-yellow-300 bg-yellow-50 p-5">
    <div className="mb-5 flex items-center justify-between">
        <div>
        <h4 className="text-sm font-semibold tracking-tight text-slate-900">
            Maintenance Assignment
        </h4>
        <p className="mt-0.5 text-sm text-slate-600">
            This asset requires maintenance. Assign a technician and set the
            priority.
        </p>
        </div>
    </div>

    {/* Technician Search */}
    <div className="mb-5">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
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
              flex-1 border border-slate-300
              bg-white px-4 py-2
              text-sm outline-none
              focus:border-blue-600
            "
        />

        <button
            type="button"
            onClick={handleSearch}
            disabled={loading}
            className="
              px-5 py-2
              text-sm font-medium text-white
              bg-blue-700
              hover:bg-blue-800
              disabled:cursor-not-allowed
              disabled:opacity-50
              transition-colors
            "
        >
            {loading ? "Searching..." : "Search"}
        </button>
        </div>

        {form.searchResults.length > 0 && (
        <div
            className="
            mt-3 max-h-56 overflow-y-auto
            border border-slate-200
            bg-white
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
                px-4 py-3 text-left text-sm
                transition-colors
                hover:bg-blue-50
                last:border-b-0
                "
            >
                <div>
                <div className="font-medium text-slate-900">
                    {user.first_name} {user.last_name}
                </div>

                <div className="text-sm text-slate-500">
                    {user.role}
                </div>
                </div>

                <span className="text-xs font-medium text-blue-700">
                Select
                </span>
            </button>
            ))}
        </div>
        )}
    </div>

    {/* Priority */}
    <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
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
            w-full border border-slate-300
            bg-white px-4 py-2
            text-sm outline-none
            focus:border-blue-600
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