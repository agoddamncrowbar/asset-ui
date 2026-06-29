import type { Asset } from "../../api/assets";

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
  onEdit
}: Props) {
  return (
    <div className="overflow-x-auto border border-blue-200 rounded-lg">
      <table className="min-w-full text-sm">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3 text-left">Tag</th>
            <th className="p-3 text-left">Item</th>
            <th className="p-3 text-left">Serial</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Condition</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {assets.map((asset, idx) => (
            <tr
              key={asset.id}
              className={
                idx % 2 === 0
                  ? "bg-white"
                  : "bg-yellow-50"
              }
            >
              <td className="p-3 font-mono text-blue-700">
                {asset.asset_tag}
              </td>

              <td className="p-3">
                {asset.item_name}
              </td>

              <td className="p-3">
                {asset.serial_number}
              </td>

              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold
                    ${
                      asset.asset_status === "available"
                        ? "bg-blue-100 text-blue-700"
                        : asset.asset_status ===
                          "maintenance"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-gray-200 text-gray-700"
                    }`}
                >
                  {asset.asset_status}
                </span>
              </td>

              <td className="p-3">
                {asset.condition_status}
              </td>

              <td className="p-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => onView(asset)}
                    className="
                      px-3 py-1 text-xs
                      bg-blue-600 text-white
                      rounded hover:bg-blue-700
                    "
                  >
                    View
                  </button>

                  {isAdmin && (
                    <button
                      onClick={() => onAssign(asset)}
                      className="
                        px-3 py-1 text-xs
                        bg-yellow-400 text-black
                        rounded hover:bg-yellow-500
                      "
                    >
                      Assign
                    </button>
                  )}

                  <button
                    onClick={() => onEdit(asset)}
                    className="
                      px-3 py-1 text-xs
                      border border-blue-600
                      text-blue-600 rounded
                      hover:bg-blue-50
                    "
                  >
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}