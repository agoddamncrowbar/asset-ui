import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import type { Asset } from "../../api/assets";

interface Props {
  isOpen: boolean;
  asset: Asset | null;
  loading: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => Promise<void>;
}

export default function RequestAssetModal({
  isOpen,
  asset,
  loading,
  onClose,
  onSubmit,
}: Props) {
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (isOpen) {
      setReason("");
    }
  }, [isOpen]);

  async function handleSubmit() {
    if (!reason.trim()) return;

    await onSubmit(reason.trim());
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Request Asset"
      footer={
        <>
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading || !reason.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </>
      }
    >
      {asset && (
        <div className="space-y-4">
          <div className="rounded bg-gray-50 border p-4">
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
                <span className="font-semibold">Condition:</span>
                <div className="capitalize">
                  {asset.condition_status.replace("_", " ")}
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Reason for Request
            </label>

            <textarea
              rows={5}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Describe why you need this asset..."
              className="w-full border rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
      )}
    </Modal>
  );
}