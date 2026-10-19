import type { Asset } from "../../api/types/assets";
import { ASSET_FILE_BASE_URL } from "../../api/assetService";

interface Props {
  assets: Asset[];
  isAdmin: boolean;
  onView: (asset: Asset) => void;
  onAssign: (asset: Asset) => void;
  onEdit: (asset: Asset) => void;
}

export default function AssetsTable({
  assets,
  isAdmin,
  onView,
  onAssign,
  onEdit,
}: Props) {
  return (
    <div className="border border-slate-200 bg-white overflow-hidden">
      <div className="border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-tight text-slate-900">
          Assets
        </h2>
        <span className="text-xs font-medium text-slate-400">
          {assets.length} total
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Photo
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Tag
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Item
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Serial
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Condition
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {assets.map((asset) => (
              <tr
                key={asset.id}
                className="
                  border-t border-slate-100
                  hover:bg-blue-50
                  transition-colors
                "
              >
                <td className="px-4 py-3">
                  {asset.image_path ? (
                    <img
                      src={`${ASSET_FILE_BASE_URL}/public${asset.image_path}`}
                      alt={asset.item_name}
                      className="h-10 w-10 border border-slate-200 object-cover"
                    />
                  ) : (
                    <div className="h-10 w-10 border border-slate-200 bg-slate-50" />
                  )}
                </td>

                <td className="px-4 py-3 font-mono text-slate-500">
                  {asset.asset_tag}
                </td>

                <td className="px-4 py-3 font-medium text-slate-900">
                  {asset.item_name}
                </td>

                <td className="px-4 py-3 text-slate-500">
                  {asset.serial_number}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`
                      inline-flex items-center gap-1.5 px-2 py-0.5
                      text-xs font-medium capitalize
                      border
                      ${
                        asset.asset_status === "available"
                          ? "border-yellow-400 text-slate-700"
                          : asset.asset_status === "maintenance"
                          ? "border-slate-300 text-slate-600"
                          : "border-slate-200 text-slate-400"
                      }
                    `}
                  >
                    <span
                      className={`h-1.5 w-1.5 ${
                        asset.asset_status === "available"
                          ? "bg-yellow-400"
                          : asset.asset_status === "maintenance"
                          ? "bg-slate-400"
                          : "bg-slate-300"
                      }`}
                    />
                    {asset.asset_status}
                  </span>
                </td>

                <td className="px-4 py-3 capitalize text-slate-600">
                  {asset.condition_status}
                </td>

                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onView(asset)}
                      className="
                        px-2.5 py-1 text-xs font-medium
                        text-slate-600
                        border border-slate-200
                        hover:bg-slate-50
                        transition-colors
                      "
                    >
                      View
                    </button>

                    {isAdmin && asset.asset_status === "available" && (
                      <button
                        onClick={() => onAssign(asset)}
                        className="
                          px-2.5 py-1 text-xs font-medium
                          text-slate-600
                          border border-slate-200
                          hover:bg-slate-50
                          transition-colors
                        "
                      >
                        Assign
                      </button>
                    )}
                    {isAdmin && (
                    <button
                      onClick={() => onEdit(asset)}
                      className="
                        px-2.5 py-1 text-xs font-medium
                        text-slate-600
                        border border-slate-200
                        hover:bg-slate-50
                        transition-colors
                      "
                    >
                      Edit
                    </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}