import { useState } from "react";

import type { Category } from "../../api/types/category";
import type { Department } from "../../api/types/department";
import type { Location } from "../../api/types/location";

import type { CreateAssetPayload } from "../../api/assetService";

interface Props {
  open: boolean;
  loading: boolean;

  categories: Category[];
  departments: Department[];
  locations: Location[];

  onClose: () => void;

  onSubmit: (data: CreateAssetPayload) => Promise<void>;
}

const initialForm = {
  item_name: "",
  serial_number: "",
  description: "",

  category_id: 0,
  department_id: 0,
  location_id: 0,

  purchase_date: "",
  purchase_cost: 0,

  supplier: "",

  condition_status: "excellent",
};

const inputClasses = `
  w-full border border-slate-200 px-3 py-2
  text-sm text-slate-900 placeholder:text-slate-400
  focus:outline-none focus:ring-1 focus:ring-slate-300
`;

const labelClasses =
  "text-xs font-semibold uppercase tracking-wide text-slate-500";

export default function CreateAssetModal({
  open,
  loading,

  categories,
  departments,
  locations,

  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState(initialForm);

  if (!open) return null;

  function resetForm() {
    setForm(initialForm);
  }

  async function handleSubmit() {
    await onSubmit(form);
    resetForm();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center sm:p-4">
      <div
        className="
          flex w-full max-h-full flex-col
          border border-slate-200 bg-white
          sm:max-w-3xl sm:max-h-[90vh]
        "
      >
        <div className="shrink-0 border-b border-slate-200 px-5 py-4">
          <h2 className="text-sm font-semibold tracking-tight text-slate-900">
            Create Asset
          </h2>
        </div>

        <div className="grid flex-1 gap-4 overflow-y-auto p-5 md:grid-cols-2">
          <div>
            <label className={labelClasses}>Item Name</label>
            <input
              value={form.item_name}
              onChange={(e) =>
                setForm({ ...form, item_name: e.target.value })
              }
              className={`${inputClasses} mt-1`}
            />
          </div>

          <div>
            <label className={labelClasses}>Serial Number</label>
            <input
              value={form.serial_number}
              onChange={(e) =>
                setForm({ ...form, serial_number: e.target.value })
              }
              className={`${inputClasses} mt-1`}
            />
          </div>

          <div>
            <label className={labelClasses}>Category</label>
            <select
              value={form.category_id}
              onChange={(e) =>
                setForm({
                  ...form,
                  category_id: Number(e.target.value),
                })
              }
              className={`${inputClasses} mt-1`}
            >
              <option value={0}>Select Category</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClasses}>Department</label>
            <select
              value={form.department_id}
              onChange={(e) =>
                setForm({
                  ...form,
                  department_id: Number(e.target.value),
                })
              }
              className={`${inputClasses} mt-1`}
            >
              <option value={0}>Select Department</option>

              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClasses}>Location</label>
            <select
              value={form.location_id}
              onChange={(e) =>
                setForm({
                  ...form,
                  location_id: Number(e.target.value),
                })
              }
              className={`${inputClasses} mt-1`}
            >
              <option value={0}>Select Location</option>

              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClasses}>Condition</label>
            <select
              value={form.condition_status}
              onChange={(e) =>
                setForm({ ...form, condition_status: e.target.value })
              }
              className={`${inputClasses} mt-1`}
            >
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>

          <div>
            <label className={labelClasses}>Purchase Date</label>
            <input
              type="date"
              value={form.purchase_date}
              onChange={(e) =>
                setForm({ ...form, purchase_date: e.target.value })
              }
              className={`${inputClasses} mt-1`}
            />
          </div>

          <div>
            <label className={labelClasses}>Purchase Cost</label>
            <input
              type="number"
              value={form.purchase_cost}
              onChange={(e) =>
                setForm({
                  ...form,
                  purchase_cost: Number(e.target.value),
                })
              }
              className={`${inputClasses} mt-1`}
            />
          </div>

          <div>
            <label className={labelClasses}>Supplier</label>
            <input
              value={form.supplier}
              onChange={(e) =>
                setForm({ ...form, supplier: e.target.value })
              }
              className={`${inputClasses} mt-1`}
            />
          </div>

          <div className="md:col-span-2">
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
            disabled={loading}
            onClick={handleSubmit}
            className="
              px-4 py-2 text-sm font-medium
              bg-slate-900 text-white
              hover:bg-slate-800
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors
            "
          >
            {loading ? "Creating..." : "Create Asset"}
          </button>
        </div>
      </div>
    </div>
  );
}