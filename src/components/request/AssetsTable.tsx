import type { Asset } from "../../api/assets";
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
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow m-4">
    <div className="overflow-x-auto">
        <table className="w-full text-sm">
        <thead className="bg-blue-700 text-white">
            <tr>
            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide">
                Asset Tag
            </th>
            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide">
                Item Name
            </th>
            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide">
                Serial Number
            </th>
            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide">
                Condition
            </th>
            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide">
                Status
            </th>
            <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide">
                Actions
            </th>
            </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
            {assets.length === 0 ? (
            <tr>
                <td
                colSpan={6}
                className="py-12 text-center text-gray-500"
                >
                No assigned assets found.
                </td>
            </tr>
            ) : (
            assets.map((asset, index) => (
                <tr
                key={asset.id}
                className={`transition-colors hover:bg-blue-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
                >
                <td className="px-5 py-4 font-semibold text-gray-900">
                    {asset.asset_tag}
                </td>

                <td className="px-5 py-4 text-gray-700">
                    {asset.item_name}
                </td>

                <td className="px-5 py-4 font-mono text-gray-600">
                    {asset.serial_number}
                </td>

                <td className="px-5 py-4">
                    <span className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
                    {asset.condition_status.replaceAll("_", " ")}
                    </span>
                </td>

                <td className="px-5 py-4">
                    <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                    {asset.asset_status.replaceAll("_", " ")}
                    </span>
                </td>

                <td className="px-5 py-4">
                    <div className="flex justify-center gap-2 whitespace-nowrap">
                    <button
                        onClick={() => onRequest(asset)}
                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                        Request
                    </button>

                    <button
                        onClick={() => onViewQueue(asset)}
                        className="rounded-md border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
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