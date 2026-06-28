import { useState } from "react";
import Modal from "../ui/Modal";
import { useAuth } from "../../auth/useAuth";
import type { Inspection } from "../../api/inspection";
import { recordInspectionResult } from "../../api/inspectionService";

import InspectionAssetCard from "./InspectionAssetCard";
import { useInspectionAssets } from "./useInspectionAssets";

interface Props {
  isOpen: boolean;
  inspection: Inspection | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function PostInspectionResultsModal({
  isOpen,
  inspection,
  onClose,
  onSaved,
}: Props) {
  const { token } = useAuth();
  const [saving, setSaving] = useState(false);

  const {
    assets,
    forms,
    loading,
    updateForm,
  } = useInspectionAssets({
    isOpen,
    inspection,
    token: token!,
  });

  async function handleSave() {
    if (!inspection) return;

    try {
      setSaving(true);

      await Promise.all(
        assets.map((asset) =>
          recordInspectionResult(
            inspection.id,
            asset.id,
            forms[asset.id],
            token!
          )
        )
      );

      onSaved();
      onClose();
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Failed to record inspection results."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record Asset Results"
    >
      {loading ? (
        <div className="py-8 text-center">
          Loading assets...
        </div>
      ) : (
        <>
          <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-2">
            {assets.map((asset) => (
              <InspectionAssetCard
                key={asset.id}
                asset={asset}
                form={forms[asset.id]}
                token={token!}
                updateForm={updateForm}
            />
            ))}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              disabled={saving}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={saving || assets.length === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : "Save Results"}
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}