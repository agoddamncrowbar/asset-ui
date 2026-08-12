import type { Asset } from "../../api/types/assets";
import AppLoader from "../loading/AppLoader";
interface Props {
  assets: Asset[];
  loading: boolean;
  onRequest: (asset: Asset) => void;
  onViewQueue: (asset: Asset) => void;
}

export default function AssetsTable({
  assets,
  loading,
  onRequest,
  onViewQueue,
}: Props) {
  if (loading) {
    return (
      <AppLoader />
    );
  }

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
                Asset Tag
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Item Name
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Serial Number
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Condition
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>
              <th className="px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {assets.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-12 text-center text-sm text-slate-500"
                >
                  No assigned assets found.
                </td>
              </tr>
            ) : (
              assets.map((asset) => (
                <tr
                  key={asset.id}
                  className="border-t border-slate-100 transition-colors hover:bg-blue-50"
                >
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {asset.asset_tag}
                  </td>

                  <td className="px-4 py-3 text-slate-600">
                    {asset.item_name}
                  </td>

                  <td className="px-4 py-3 font-mono text-slate-500">
                    {asset.serial_number}
                  </td>

                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 border border-yellow-400 px-2 py-0.5 text-xs font-medium capitalize text-slate-700">
                      <span className="h-1.5 w-1.5 bg-yellow-400" />
                      {asset.condition_status.replaceAll("_", " ")}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 border border-yellow-400 px-2 py-0.5 text-xs font-medium capitalize text-slate-700">
                      <span className="h-1.5 w-1.5 bg-yellow-400" />
                      {asset.asset_status.replaceAll("_", " ")}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2 whitespace-nowrap">
                      <button
                        onClick={() => onRequest(asset)}
                        className="
                          px-3 py-1.5 border border-slate-200
                          text-xs font-semibold uppercase tracking-wide
                          text-slate-600
                          transition-colors
                          hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200
                        "
                      >
                        Request
                      </button>

                      <button
                        onClick={() => onViewQueue(asset)}
                        className="
                          px-3 py-1.5 border border-slate-200
                          text-xs font-semibold uppercase tracking-wide
                          text-slate-600
                          transition-colors
                          hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200
                        "
                      >
                        View Queue
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}