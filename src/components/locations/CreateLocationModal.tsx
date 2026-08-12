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
      <div className="w-full max-w-lg border border-slate-200 bg-white overflow-hidden">
        <div className="border-b border-slate-200 px-4 py-3">
          <h2 className="text-sm font-semibold tracking-tight text-slate-900">
            Create Location
          </h2>
        </div>

        <div className="space-y-4 px-4 py-4">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
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
                w-full border border-slate-200 px-3 py-2
                text-sm text-slate-900 placeholder:text-slate-400
                transition-colors
                focus:outline-none focus:border-blue-400
              "
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
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
                w-full border border-slate-200 px-3 py-2
                text-sm text-slate-900 placeholder:text-slate-400
                transition-colors
                focus:outline-none focus:border-blue-400
              "
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
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
                w-full border border-slate-200 px-3 py-2
                text-sm text-slate-900 placeholder:text-slate-400
                transition-colors
                focus:outline-none focus:border-blue-400
              "
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
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
                w-full border border-slate-200 px-3 py-2
                text-sm text-slate-900 placeholder:text-slate-400
                transition-colors
                focus:outline-none focus:border-blue-400
              "
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-200 px-4 py-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="
              px-3 py-1.5 border border-slate-200
              text-xs font-semibold uppercase tracking-wide
              text-slate-600
              transition-colors
              hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200
              disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-600 disabled:hover:border-slate-200
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="
              px-3 py-1.5 border border-slate-200
              text-xs font-semibold uppercase tracking-wide
              text-slate-600
              transition-colors
              hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200
              disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-600 disabled:hover:border-slate-200
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