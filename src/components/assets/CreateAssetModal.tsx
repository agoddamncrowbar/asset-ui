import { useState } from "react";

import type { Category } from "../../api/category";
import type { Department } from "../../api/department";
import type { Location } from "../../api/location";

import type {
  CreateAssetPayload,
} from "../../api/assetService";

interface Props {
  open: boolean;
  loading: boolean;

  categories: Category[];
  departments: Department[];
  locations: Location[];

  onClose: () => void;

  onSubmit: (
    data: CreateAssetPayload
  ) => Promise<void>;
}

export default function CreateAssetModal({
  open,
  loading,

  categories,
  departments,
  locations,

  onClose,
  onSubmit,
}: Props) {

  
  
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
    if (!open) return null;
    const [form, setForm] = useState(initialForm);

    function resetForm() {
    setForm(initialForm);
    }
    async function handleSubmit() {
        await onSubmit(form);
        resetForm();
    }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-3xl rounded-xl bg-white">
        <div className="border-b p-5">
          <h2 className="text-lg font-semibold">
            Create Asset
          </h2>
        </div>

        <div className="grid gap-4 p-5 md:grid-cols-2">

          <input
            placeholder="Item Name"
            value={form.item_name}
            onChange={(e) =>
              setForm({
                ...form,
                item_name: e.target.value,
              })
            }
            className="rounded-lg border px-3 py-2"
          />

          <input
            placeholder="Serial Number"
            value={form.serial_number}
            onChange={(e) =>
              setForm({
                ...form,
                serial_number: e.target.value,
              })
            }
            className="rounded-lg border px-3 py-2"
          />

          <select
            value={form.category_id}
            onChange={(e) =>
              setForm({
                ...form,
                category_id: Number(
                  e.target.value
                ),
              })
            }
            className="rounded-lg border px-3 py-2"
          >
            <option value={0}>
              Select Category
            </option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>

          <select
            value={form.department_id}
            onChange={(e) =>
              setForm({
                ...form,
                department_id: Number(
                  e.target.value
                ),
              })
            }
            className="rounded-lg border px-3 py-2"
          >
            <option value={0}>
              Select Department
            </option>

            {departments.map((department) => (
              <option
                key={department.id}
                value={department.id}
              >
                {department.name}
              </option>
            ))}
          </select>

          <select
            value={form.location_id}
            onChange={(e) =>
              setForm({
                ...form,
                location_id: Number(
                  e.target.value
                ),
              })
            }
            className="rounded-lg border px-3 py-2"
          >
            <option value={0}>
              Select Location
            </option>

            {locations.map((location) => (
              <option
                key={location.id}
                value={location.id}
              >
                {location.name}
              </option>
            ))}
          </select>

          <select
            value={form.condition_status}
            onChange={(e) =>
              setForm({
                ...form,
                condition_status:
                  e.target.value,
              })
            }
            className="rounded-lg border px-3 py-2"
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

          <input
            type="date"
            value={form.purchase_date}
            onChange={(e) =>
              setForm({
                ...form,
                purchase_date:
                  e.target.value,
              })
            }
            className="rounded-lg border px-3 py-2"
          />

          <input
            type="number"
            value={form.purchase_cost}
            onChange={(e) =>
              setForm({
                ...form,
                purchase_cost: Number(
                  e.target.value
                ),
              })
            }
            className="rounded-lg border px-3 py-2"
          />

          <input
            placeholder="Supplier"
            value={form.supplier}
            onChange={(e) =>
              setForm({
                ...form,
                supplier: e.target.value,
              })
            }
            className="rounded-lg border px-3 py-2"
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description:
                  e.target.value,
              })
            }
            className="
              rounded-lg border px-3 py-2
              md:col-span-2
            "
            rows={4}
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
            disabled={loading}
            onClick={handleSubmit}
            className="
              rounded-lg bg-blue-600
              px-4 py-2 text-white
            "
          >
            {loading
              ? "Creating..."
              : "Create Asset"}
          </button>
        </div>
      </div>
    </div>
  );
}