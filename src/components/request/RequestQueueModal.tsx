import Modal from "../ui/Modal";
import type { Asset } from "../../api/assets";
import type { AssetRequest } from "../../api/requests";
import AppLoader from "../loading/AppLoader";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  asset: Asset | null;
  requests: AssetRequest[];
  loading: boolean;
}

export default function RequestQueueModal({
  isOpen,
  onClose,
  asset,
  requests,
  loading,
}: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Asset Request Queue"
      footer={
        <button
          onClick={onClose}
          className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
        >
          Close
        </button>
      }
    >
      {asset && (
        <div className="space-y-4">
          {/* Asset Details */}
          <div className="bg-gray-50 border rounded p-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="font-semibold">Asset Tag:</span>
                <div>{asset.asset_tag}</div>
              </div>

              <div>
                <span className="font-semibold">Item:</span>
                <div>{asset.item_name}</div>
              </div>

              <div>
                <span className="font-semibold">Serial Number:</span>
                <div>{asset.serial_number}</div>
              </div>

              <div>
                <span className="font-semibold">Status:</span>
                <div className="capitalize">
                  {asset.asset_status.replaceAll("_", " ")}
                </div>
              </div>
            </div>
          </div>

          {/* Queue */}
          {loading ? (
            <AppLoader />
          ) : requests.length === 0 ? (
            <div className="py-6 text-center text-gray-500">
              No requests for this asset.
            </div>
          ) : (
            <div className="overflow-x-auto border rounded">
              <table className="min-w-full text-sm">
                <thead className="bg-blue-700 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Position</th>
                    <th className="px-4 py-3 text-left">User ID</th>
                    <th className="px-4 py-3 text-left">Reason</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Requested</th>
                  </tr>
                </thead>

                <tbody>
                  {requests.map((request) => (
                    <tr
                      key={request.id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="px-4 py-3">
                        {request.queue_position}
                      </td>

                      <td className="px-4 py-3">
                        {request.requested_by}
                      </td>

                      <td className="px-4 py-3 max-w-sm wrap-break-word">
                        {request.reason}
                      </td>

                      <td className="px-4 py-3 capitalize">
                        {request.status.replaceAll("_", " ")}
                      </td>

                      <td className="px-4 py-3">
                        {new Date(
                          request.requested_at
                        ).toLocaleString()}
                      </td>
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