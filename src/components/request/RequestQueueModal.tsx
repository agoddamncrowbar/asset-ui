import Modal from "../ui/Modal";
import type { Asset } from "../../api/types/assets";
import type { AssetRequest } from "../../api/types/requests";
import AppLoader from "../loading/AppLoader";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  asset: Asset | null;
  requests: AssetRequest[];
  loading: boolean;

  isAdmin: boolean;
  approvingId: number | null;

  onApprove: (
    request: AssetRequest
  ) => void;
}

export default function RequestQueueModal({
  isOpen,
  onClose,
  asset,
  requests,
  loading,
  isAdmin,
  approvingId,
  onApprove,
}: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Asset Request Queue"
      footer={
        <button
          onClick={onClose}
          className="
            px-3 py-1.5 border border-slate-200
            text-xs font-semibold uppercase tracking-wide
            text-slate-600
            transition-colors
            hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200
          "
        >
          Close
        </button>
      }
    >
      {asset && (
        <div className="space-y-4">
          {/* Asset Details */}
          <div className="border border-slate-200 p-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Asset Tag
                </span>
                <div className="mt-0.5 font-medium text-slate-900">
                  {asset.asset_tag}
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Item
                </span>
                <div className="mt-0.5 text-slate-600">
                  {asset.item_name}
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Serial Number
                </span>
                <div className="mt-0.5 font-mono text-slate-500">
                  {asset.serial_number}
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </span>
                <div className="mt-0.5 capitalize text-slate-600">
                  {asset.asset_status.replaceAll("_", " ")}
                </div>
              </div>
            </div>
          </div>

          {/* Queue */}
          {loading ? (
            <AppLoader />
          ) : requests.length === 0 ? (
            <div className="py-6 text-center text-sm text-slate-500">
              No requests for this asset.
            </div>
          ) : (
            <div className="overflow-x-auto border border-slate-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Position
                    </th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      User ID
                    </th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Reason
                    </th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Status
                    </th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Requested
                    </th>
                    {isAdmin && (
                        <th className="px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Actions
                        </th>
                    )}
                  </tr>
                </thead>

                <tbody>
                  {requests.map((request) => (
                    <tr
                      key={request.id}
                      className="border-t border-slate-100 hover:bg-blue-50 transition-colors"
                    >
                      <td className="px-4 py-3 text-slate-500">
                        {request.queue_position}
                      </td>

                      <td className="px-4 py-3 font-medium text-slate-900">
                        {request.requested_by}
                      </td>

                      <td className="px-4 py-3 max-w-sm wrap-break-word text-slate-600">
                        {request.reason}
                      </td>

                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5 border border-yellow-400 px-2 py-0.5 text-xs font-medium capitalize text-slate-700">
                          <span className="h-1.5 w-1.5 bg-yellow-400" />
                          {request.status.replaceAll("_", " ")}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-slate-500">
                        {new Date(
                          request.requested_at
                        ).toLocaleString()}
                      </td>
                      {isAdmin && (
                        <td className="px-4 py-3 text-center">
                            {request.status === "queued" ? (
                            <button
                                disabled={approvingId === request.id}
                                onClick={() => onApprove(request)}
                                className="
                                  px-3 py-1.5 border border-slate-200
                                  text-xs font-semibold uppercase tracking-wide
                                  text-slate-600
                                  transition-colors
                                  hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200
                                  disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-600 disabled:hover:border-slate-200
                                "
                            >
                                {approvingId === request.id
                                ? "Approving..."
                                : "Approve"}
                            </button>
                            ) : (
                            <span className="text-slate-300">
                                —
                            </span>
                            )}
                        </td>
                        )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}