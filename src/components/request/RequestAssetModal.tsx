import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import type { Asset } from "../../api/types/assets";

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
            className="
              px-3 py-1.5 border border-slate-200
              text-xs font-semibold uppercase tracking-wide
              text-slate-600
              transition-colors
              hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200
              disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-600 disabled:hover:border-slate-200
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading || !reason.trim()}
            className="
              px-3 py-1.5 border border-slate-200
              text-xs font-semibold uppercase tracking-wide
              text-slate-600
              transition-colors
              hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200
              disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-600 disabled:hover:border-slate-200
            "
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </>
      }
    >
      {asset && (
        <div className="space-y-4">
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
                  Condition
                </span>
                <div className="mt-0.5 capitalize text-slate-600">
                  {asset.condition_status.replace("_", " ")}
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Reason for Request
            </label>

            <textarea
              rows={5}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Describe why you need this asset..."
              className="
                w-full border border-slate-200 px-3 py-2
                text-sm text-slate-900 placeholder:text-slate-400
                transition-colors
                focus:outline-none focus:border-blue-400
              "
            />
          </div>
        </div>
      )}
    </Modal>
  );
}