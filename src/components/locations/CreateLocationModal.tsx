import { useState } from "react";
import type {
  CreateLocationPayload,
} from "../../api/locationService";

interface Props {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onSubmit: (
    data: CreateLocationPayload
  ) => Promise<void>;
}

export default function CreateLocationModal({
  open,
  loading,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState({
    name: "",
    building: "",
    room_number: "",
    description: "",
  });

  if (!open) return null;

  async function handleSubmit() {
    if (
      !form.name.trim() ||
      !form.building.trim() ||
      !form.room_number.trim()
    ) {
      alert(
        "Name, building and room number are required."
      );
      return;
    }

    await onSubmit(form);

    setForm({
      name: "",
      building: "",
      room_number: "",
      description: "",
    });
  }

  function updateField(
    field: keyof typeof form,
    value: string
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
        <div className="border-b p-5">
          <h2 className="text-lg font-semibold">
            Create Location
          </h2>
        </div>

        <div className="space-y-4 p-5">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Location Name
            </label>

            <input
              type="text"
              value={form.name}
              onChange={(e) =>
                updateField(
                  "name",
                  e.target.value
                )
              }
              placeholder="Software Lab"
              className="
                w-full rounded-lg border
                border-slate-300 px-3 py-2
                focus:border-blue-500
                focus:outline-none
              "
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Building
            </label>

            <input
              type="text"
              value={form.building}
              onChange={(e) =>
                updateField(
                  "building",
                  e.target.value
                )
              }
              placeholder="Lilian Beam"
              className="
                w-full rounded-lg border
                border-slate-300 px-3 py-2
                focus:border-blue-500
                focus:outline-none
              "
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Room Number
            </label>

            <input
              type="text"
              value={form.room_number}
              onChange={(e) =>
                updateField(
                  "room_number",
                  e.target.value
                )
              }
              placeholder="SLAB"
              className="
                w-full rounded-lg border
                border-slate-300 px-3 py-2
                focus:border-blue-500
                focus:outline-none
              "
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Description
            </label>

            <textarea
              rows={4}
              value={form.description}
              onChange={(e) =>
                updateField(
                  "description",
                  e.target.value
                )
              }
              placeholder="Software computer lab used for testing and development"
              className="
                w-full rounded-lg border
                border-slate-300 px-3 py-2
                focus:border-blue-500
                focus:outline-none
              "
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t p-5">
          <button
            onClick={onClose}
            disabled={loading}
            className="
              rounded-lg border
              px-4 py-2 hover:bg-slate-50
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
            {loading
              ? "Creating..."
              : "Create Location"}
          </button>
        </div>
      </div>
    </div>
  );
}