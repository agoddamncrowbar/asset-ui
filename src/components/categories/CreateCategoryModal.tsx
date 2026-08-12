import { useState } from "react";
import type { CreateCategoryPayload } from "../../api/categoryService";

interface Props {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onSubmit: (data: CreateCategoryPayload) => Promise<void>;
}

const initialForm = {
  name: "",
  description: "",
  depreciation_period: 12,
};

const inputClasses = `
  w-full border border-slate-200 px-3 py-2
  text-sm text-slate-900 placeholder:text-slate-400
  focus:outline-none focus:ring-1 focus:ring-slate-300
`;

const labelClasses =
  "text-xs font-semibold uppercase tracking-wide text-slate-500";

export default function CreateCategoryModal({
  open,
  loading,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState(initialForm);

  if (!open) return null;

  async function handleSubmit() {
    await onSubmit(form);
    setForm(initialForm);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center sm:p-4">
      <div
        className="
          flex w-full max-h-full flex-col
          border border-slate-200 bg-white
          sm:max-w-lg sm:max-h-[90vh]
        "
      >
        <div className="shrink-0 border-b border-slate-200 px-5 py-4">
          <h2 className="text-sm font-semibold tracking-tight text-slate-900">
            Create Category
          </h2>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          <div>
            <label className={labelClasses}>Name</label>
            <input
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className={`${inputClasses} mt-1`}
            />
          </div>

          <div>
            <label className={labelClasses}>Description</label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className={`${inputClasses} mt-1`}
              rows={4}
            />
          </div>

          <div>
            <label className={labelClasses}>
              Depreciation Period (months)
            </label>
            <input
              type="number"
              min={1}
              value={form.depreciation_period}
              onChange={(e) =>
                setForm({
                  ...form,
                  depreciation_period: Number(e.target.value),
                })
              }
              className={`${inputClasses} mt-1`}
            />
          </div>
        </div>

        <div className="flex shrink-0 justify-end gap-3 border-t border-slate-200 px-5 py-4">
          <button
            onClick={onClose}
            className="
              px-4 py-2 text-sm font-medium
              text-slate-600
              border border-slate-200
              hover:bg-slate-50
              transition-colors
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="
              px-4 py-2 text-sm font-medium
              bg-slate-900 text-white
              hover:bg-slate-800
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors
            "
          >
            {loading ? "Creating..." : "Create Category"}
          </button>
        </div>
      </div>
    </div>
  );
}