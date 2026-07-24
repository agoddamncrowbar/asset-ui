import { useState } from "react";
import type { CreateUserPayload } from "../../api/userService";

interface Props {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onSubmit: (data: CreateUserPayload) => Promise<void>;
}

export default function CreateUserModal({
    open,
    loading,
    onClose,
    onSubmit,
    }: Props) {
    const [form, setForm] = useState({
        university_id: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        role: "student",
    });

    if (!open) return null;

    function updateField(
        field: keyof typeof form,
        value: string
    ) {
        setForm((prev) => ({
        ...prev,
        [field]: value,
        }));
    }

    async function handleSubmit() {
        await onSubmit(form);

        setForm({
        university_id: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        role: "student",
        });
    }

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-slate-900/40 p-4
      "
    >
      <div
        className="
          w-full max-w-2xl
          bg-white border border-slate-200
        "
      >
        <div className="flex items-center justify-between border-b border-slate-200 p-5">
          <h2 className="text-sm font-semibold tracking-tight text-slate-900">
            Create User
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-900 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="grid gap-4 p-5 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              University ID
            </label>

            <input
              value={form.university_id}
              onChange={(e) =>
                updateField("university_id", e.target.value)
              }
              className="w-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Role
            </label>

            <select
              value={form.role}
              onChange={(e) =>
                updateField("role", e.target.value)
              }
              className="w-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
            >
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="technologist">Technologist</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              First Name
            </label>

            <input
              value={form.first_name}
              onChange={(e) =>
                updateField("first_name", e.target.value)
              }
              className="w-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Last Name
            </label>

            <input
              value={form.last_name}
              onChange={(e) =>
                updateField("last_name", e.target.value)
              }
              className="w-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Email
            </label>

            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                updateField("email", e.target.value)
              }
              className="w-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Phone
            </label>

            <input
              value={form.phone}
              onChange={(e) =>
                updateField("phone", e.target.value)
              }
              className="w-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Password
            </label>

            <input
              type="password"
              value={form.password}
              onChange={(e) =>
                updateField("password", e.target.value)
              }
              className="w-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-200 p-5">
          <button
            onClick={onClose}
            className="
              px-4 py-2 text-sm font-medium
              border border-slate-300 text-slate-700
              hover:border-blue-600 hover:bg-blue-50
              transition-colors
            "
          >
            Cancel
          </button>

            <button
            onClick={handleSubmit}
            disabled={loading}
            className="
                px-4 py-2 text-sm font-medium text-white
                bg-blue-700 hover:bg-blue-800
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors
            "
            >
            {loading ? "Creating..." : "Create User"}
            </button>
        </div>
      </div>
    </div>
  );
}