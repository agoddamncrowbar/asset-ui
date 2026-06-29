import { useEffect, useState } from "react";
import Modal from "../ui/Modal";

import type {
  Asset,
  UpdateAssetPayload,
} from "../../api/assets";
import type { Category } from "../../api/category";
import type { Department } from "../../api/department";
import type { Location } from "../../api/location";

interface Props {
  open: boolean;
  loading: boolean;
  asset: Asset | null;

  categories: Category[];
  departments: Department[];
  locations: Location[];

  onClose: () => void;
  onSubmit: (
    data: UpdateAssetPayload
  ) => Promise<void>;
}

export default function EditAssetModal({
  open,
  loading,
  asset,
  categories,
  departments,
  locations,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] =
    useState<UpdateAssetPayload>({
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
    });

  useEffect(() => {
    if (!asset) return;

    setForm({
      item_name: asset.item_name,
      serial_number: asset.serial_number,
      description: asset.description ?? "",
      category_id: asset.category_id,
      department_id: asset.department_id,
      location_id: asset.location_id,
      purchase_date: asset.purchase_date ?? "",
      purchase_cost: Number(
        asset.purchase_cost ?? 0
      ),
      supplier: asset.supplier ?? "",
      condition_status:
        asset.condition_status,
    });
  }, [asset]);

  function update<
    K extends keyof UpdateAssetPayload
  >(
    key: K,
    value: UpdateAssetPayload[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      title="Edit Asset"
      footer={
        <>
          <button
            disabled={loading}
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={() => onSubmit(form)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : "Save Changes"}
          </button>
        </>
      }
    >
      <div className="max-h-[70vh] overflow-y-auto pr-2">
        <div className="grid grid-cols-2 gap-4">

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">
              Item Name
            </label>

            <input
              disabled={loading}
              className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
              value={form.item_name}
              onChange={(e) =>
                update(
                  "item_name",
                  e.target.value
                )
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Serial Number
            </label>

            <input
              disabled={loading}
              className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
              value={form.serial_number}
              onChange={(e) =>
                update(
                  "serial_number",
                  e.target.value
                )
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Supplier
            </label>

            <input
              disabled={loading}
              className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
              value={form.supplier}
              onChange={(e) =>
                update(
                  "supplier",
                  e.target.value
                )
              }
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">
              Description
            </label>

            <textarea
              rows={3}
              disabled={loading}
              className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
              value={form.description}
              onChange={(e) =>
                update(
                  "description",
                  e.target.value
                )
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Category
            </label>

            <select
              disabled={loading}
              className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
              value={form.category_id}
              onChange={(e) =>
                update(
                  "category_id",
                  Number(e.target.value)
                )
              }
            >
              {categories.map((c) => (
                <option
                  key={c.id}
                  value={c.id}
                >
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Department
            </label>

            <select
              disabled={loading}
              className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
              value={form.department_id}
              onChange={(e) =>
                update(
                  "department_id",
                  Number(e.target.value)
                )
              }
            >
              {departments.map((d) => (
                <option
                  key={d.id}
                  value={d.id}
                >
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Location
            </label>

            <select
              disabled={loading}
              className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
              value={form.location_id}
              onChange={(e) =>
                update(
                  "location_id",
                  Number(e.target.value)
                )
              }
            >
              {locations.map((l) => (
                <option
                  key={l.id}
                  value={l.id}
                >
                  {l.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Condition
            </label>

            <select
              disabled={loading}
              className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
              value={
                form.condition_status
              }
              onChange={(e) =>
                update(
                  "condition_status",
                  e.target.value
                )
              }
            >
              <option value="excellent">
                Excellent
              </option>
              <option value="good">
                Good
              </option>
              <option value="fair">
                Fair
              </option>
              <option value="poor">
                Poor
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Purchase Date
            </label>

            <input
              type="date"
              disabled={loading}
              className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
              value={form.purchase_date}
              onChange={(e) =>
                update(
                  "purchase_date",
                  e.target.value
                )
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Purchase Cost
            </label>

            <input
              type="number"
              step="0.01"
              disabled={loading}
              className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
              value={form.purchase_cost}
              onChange={(e) =>
                update(
                  "purchase_cost",
                  Number(e.target.value)
                )
              }
            />
          </div>

        </div>
      </div>
    </Modal>
  );
}