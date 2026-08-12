import { useState } from "react";
import Modal from "../ui/Modal";
import { useAuth } from "../../auth/useAuth";
import type { Inspection } from "../../api/types/inspection";
import { recordInspectionResult } from "../../api/inspectionService";

import InspectionAssetCard from "./InspectionAssetCard";
import { useInspectionAssets } from "./useInspectionAssets";

interface Props {
  isOpen: boolean;
  inspection: Inspection | null;
  onClose: () => void;
  onSaved: () => void;
  currentUserId: number;
}

export default function PostInspectionResultsModal({
  isOpen,
  inspection,
  onClose,
  onSaved,
  currentUserId,
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
  console.log("Save button clicked");

  if (!inspection) {
    console.log("No inspection selected");
    return;
  }

  console.log("Inspection:", inspection);
  console.log("Assets:", assets);
  console.log("Forms:", forms);

  try {
    setSaving(true);

    const requests = assets.map((asset) => {
      const form = forms[asset.id];

      console.log(`Preparing payload for asset ${asset.id}`, form);

      const payload = {
        result: form.result,
        condition_after: form.condition_after,
        remarks: form.remarks,

        requires_maintenance:
            form.result === "damaged" ||
            form.result === "needs_repair",

        maintenance_priority: form.maintenance_priority,
        assigned_to: form.assigned_to ?? undefined,

        user_id: currentUserId,
    };

      console.log("Payload:", payload);

      return recordInspectionResult(
        inspection.id,
        asset.id,
        payload,
        token!
      );
    });

    console.log("Sending requests...", requests.length);

    const responses = await Promise.all(requests);

    console.log("Responses:", responses);

    onSaved();
    onClose();
  } catch (err) {
    console.error("Error while saving inspection results:", err);

    alert(
      err instanceof Error
        ? err.message
        : "Failed to record inspection results."
    );
  } finally {
    console.log("Finished saving");
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
        <div className="py-8 text-center text-sm text-slate-500">
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
              className="px-4 py-2 text-sm font-medium border border-slate-300 text-slate-700 hover:border-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={saving || assets.length === 0}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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