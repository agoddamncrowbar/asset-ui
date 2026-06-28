import type { Asset } from "../../api/assets";
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
    <div className="border rounded-lg p-4">
      <div className="mb-4">
        <h3 className="font-semibold text-lg">
          {asset.item_name}
        </h3>

        <p className="text-sm text-gray-600">
          Asset Tag: {asset.asset_tag}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">
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
            className="w-full border rounded px-3 py-2"
          >
            <option value="ok">OK</option>
            <option value="damaged">Damaged</option>
            <option value="needs_repair">Needs Repair</option>
            <option value="retire">Retire</option></select>
        </div>
        <div>
          <label className="block mb-1 font-medium">
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
            className="w-full border rounded px-3 py-2"
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
          <MaintenanceAssignment
            form={form}
            token={token}
            updateForm={(field, value) =>
              updateForm(asset.id, field, value)
            }
          />
        )}
      <div className="mt-4">
        <label className="block mb-1 font-medium">
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
          className="w-full border rounded px-3 py-2"
          placeholder="Enter inspection remarks..."
        />
      </div>
    </div>
  );
}