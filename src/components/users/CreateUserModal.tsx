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
        bg-black/40 p-4
      "
    >
      <div
        className="
          w-full max-w-2xl
          rounded-xl bg-white shadow-xl
        "
      >
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-lg font-semibold">
            Create User
          </h2>

          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-900"
          >
            ✕
          </button>
        </div>

        <div className="grid gap-4 p-5 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">
              University ID
            </label>

            <input
              value={form.university_id}
              onChange={(e) =>
                updateField("university_id", e.target.value)
              }
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Role
            </label>

            <select
              value={form.role}
              onChange={(e) =>
                updateField("role", e.target.value)
              }
              className="w-full rounded-lg border px-3 py-2"
            >
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="technologist">Technologist</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              First Name
            </label>

            <input
              value={form.first_name}
              onChange={(e) =>
                updateField("first_name", e.target.value)
              }
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Last Name
            </label>

            <input
              value={form.last_name}
              onChange={(e) =>
                updateField("last_name", e.target.value)
              }
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                updateField("email", e.target.value)
              }
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Phone
            </label>

            <input
              value={form.phone}
              onChange={(e) =>
                updateField("phone", e.target.value)
              }
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              value={form.password}
              onChange={(e) =>
                updateField("password", e.target.value)
              }
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t p-5">
          <button
            onClick={onClose}
            className="
              rounded-lg border
              px-4 py-2
              hover:bg-slate-50
            "
          >
            Cancel
          </button>

            <button
            onClick={handleSubmit}
            disabled={loading}
            className="
                rounded-lg bg-blue-600
                px-4 py-2 text-white
                hover:bg-blue-700
                disabled:opacity-50
            "
            >
            {loading ? "Creating..." : "Create User"}
            </button>
        </div>
      </div>
    </div>
  );
}