import type { Asset } from "../../api/types/assets";
import type { AssetInspectionForm } from "./types";
import MaintenanceAssignment from "./MaintenanceAssignment";
interface Props {
  asset: Asset;
  form: AssetInspectionForm;
  token: string;
  updateForm: <K extends keyof AssetInspectionForm>(
    assetId: number,
    field: K,
    value: AssetInspectionForm[K]
  ) => void;
}

export default function InspectionAssetCard({
  asset,
  form,
  token,
  updateForm,
}: Props) {
  return (
    <div className="border border-slate-200 p-4">
      <div className="mb-4">
        <h3 className="text-sm font-semibold tracking-tight text-slate-900">
          {asset.item_name}
        </h3>

        <p className="mt-0.5 text-sm text-slate-500">
          Asset Tag: {asset.asset_tag}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Inspection Result
          </label>

          <select
            value={form.result}
            onChange={(e) =>
              updateForm(
                asset.id,
                "result",
                e.target.value as AssetInspectionForm["result"]
              )
            }
            className="w-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
          >
            <option value="ok">OK</option>
            <option value="damaged">Damaged</option>
            <option value="needs_repair">Needs Repair</option>
            <option value="retire">Retire</option></select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Condition After
          </label>

          <select
            value={form.condition_after}
            onChange={(e) =>
              updateForm(
                asset.id,
                "condition_after",
                e.target.value as AssetInspectionForm["condition_after"]
              )
            }
            className="w-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
          >
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
            <option value="damaged">Damaged</option>
          </select>
        </div>
      </div>
      {(form.result === "damaged" ||
          form.result === "needs_repair") && (
          <div className="mt-4 border-t border-slate-100 pt-4">
            <MaintenanceAssignment
              form={form}
              token={token}
              updateForm={(field, value) =>
                updateForm(asset.id, field, value)
              }
            />
          </div>
        )}
      <div className="mt-4">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Remarks
        </label>

        <textarea
          rows={3}
          value={form.remarks}
          onChange={(e) =>
            updateForm(
              asset.id,
              "remarks",
              e.target.value
            )
          }
          className="w-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
          placeholder="Enter inspection remarks..."
        />
      </div>
    </div>
  );
}