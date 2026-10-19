import { useEffect, useState } from "react";
import Modal from "../ui/Modal";

import type {
  Asset,
  UpdateAssetPayload,
} from "../../api/types/assets";
import type { Category } from "../../api/types/category";
import type { Department } from "../../api/types/department";
import type { Location } from "../../api/types/location";
import { ASSET_FILE_BASE_URL } from "../../api/assetService";

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
  onUploadImage: (file: File) => Promise<void>;
  onDeleteImage: () => Promise<void>;
  imageActionLoading: boolean;
}

const labelClasses = "block text-sm font-medium text-slate-900";
const inputClasses =
  "w-full border border-slate-200 px-3 py-2 text-sm disabled:bg-slate-50 disabled:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900";

export default function EditAssetModal({
  open,
  loading,
  asset,
  categories,
  departments,
  locations,
  onClose,
  onSubmit,
  onUploadImage,
  onDeleteImage,
  imageActionLoading,
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

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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
    setImageFile(null);
  }, [asset]);
  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(imageFile);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

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
  async function handleUpload() {
    if (!imageFile) return;
    await onUploadImage(imageFile);
    setImageFile(null);
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
            className="
              px-4 py-2 text-sm font-medium
              text-slate-600
              border border-slate-200
              hover:bg-slate-50
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors
            "
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={() => onSubmit(form)}
            className="
              px-4 py-2 text-sm font-medium
              bg-slate-900 text-white
              hover:bg-slate-800
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors
            "
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
            <label className={labelClasses}>
              Photo
            </label>

            <div className="mt-1 flex items-center gap-4">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Selected preview"
                  className="h-20 w-20 border border-slate-200 object-cover"
                />
              ) : asset?.image_path ? (
                <img
                  src={`${ASSET_FILE_BASE_URL}/public${asset.image_path}`}
                  alt={asset.item_name}
                  className="h-20 w-20 border border-slate-200 object-cover"
                />
              ) : (
                <div className="h-20 w-20 border border-slate-200 bg-slate-50 flex items-center justify-center text-xs text-slate-400">
                  No photo
                </div>
              )}

              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  disabled={imageActionLoading}
                  onChange={(e) =>
                    setImageFile(e.target.files?.[0] ?? null)
                  }
                  className="text-sm text-slate-600"
                />

                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={!imageFile || imageActionLoading}
                    onClick={handleUpload}
                    className="
                      px-3 py-1.5 text-xs font-medium
                      bg-slate-900 text-white
                      hover:bg-slate-800
                      disabled:opacity-50 disabled:cursor-not-allowed
                      transition-colors
                    "
                  >
                    {imageActionLoading ? "Saving..." : "Upload"}
                  </button>

                  {asset?.image_path && (
                    <button
                      type="button"
                      disabled={imageActionLoading}
                      onClick={onDeleteImage}
                      className="
                        px-3 py-1.5 text-xs font-medium
                        text-red-600
                        border border-red-200
                        hover:bg-red-50
                        disabled:opacity-50 disabled:cursor-not-allowed
                        transition-colors
                      "
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <label className={labelClasses}>
              Item Name
            </label>

            <input
              disabled={loading}
              className={`${inputClasses} mt-1`}
              value={form.item_name}
              onChange={(e) =>
                update("item_name", e.target.value)
              }
            />
          </div>

          <div>
            <label className={labelClasses}>
              Serial Number
            </label>

            <input
              disabled={loading}
              className={`${inputClasses} mt-1`}
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
            <label className={labelClasses}>
              Supplier
            </label>

            <input
              disabled={loading}
              className={`${inputClasses} mt-1`}
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
            <label className={labelClasses}>
              Description
            </label>

            <textarea
              rows={3}
              disabled={loading}
              className={`${inputClasses} mt-1`}
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
            <label className={labelClasses}>
              Category
            </label>

            <select
              disabled={loading}
              className={`${inputClasses} mt-1`}
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
            <label className={labelClasses}>
              Department
            </label>

            <select
              disabled={loading}
              className={`${inputClasses} mt-1`}
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
            <label className={labelClasses}>
              Location
            </label>

            <select
              disabled={loading}
              className={`${inputClasses} mt-1`}
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
            <label className={labelClasses}>
              Condition
            </label>

            <select
              disabled={loading}
              className={`${inputClasses} mt-1`}
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
            <label className={labelClasses}>
              Purchase Date
            </label>

            <input
              type="date"
              disabled={loading}
              className={`${inputClasses} mt-1`}
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
            <label className={labelClasses}>
              Purchase Cost
            </label>

            <input
              type="number"
              step="0.01"
              disabled={loading}
              className={`${inputClasses} mt-1`}
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