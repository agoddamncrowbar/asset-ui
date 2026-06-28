import { useState } from "react";
import type { CreateDepartmentPayload, } from "../../api/departmentService";

interface Props {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onSubmit: (
    data: CreateDepartmentPayload
  ) => Promise<void>;
}

export default function CreateDepartmentModal({
  open,
  loading,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState({
    name: "",
    code: "",
    description: "",
  });

  if (!open) return null;

  async function handleSubmit() {
    await onSubmit(form);

    setForm({
      name: "",
      code: "",
      description: "",
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white">
        <div className="border-b p-5">
          <h2 className="font-semibold">
            Create Department
          </h2>
        </div>

        <div className="space-y-4 p-5">
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="w-full rounded-lg border px-3 py-2"
          />

          <input
            placeholder="Code"
            value={form.code}
            onChange={(e) =>
              setForm({
                ...form,
                code: e.target.value,
              })
            }
            className="w-full rounded-lg border px-3 py-2"
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div className="flex justify-end gap-3 border-t p-5">
          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="
              rounded-lg bg-blue-600
              px-4 py-2 text-white
            "
          >
            {loading
              ? "Creating..."
              : "Create Department"}
          </button>
        </div>
      </div>
    </div>
  );
}