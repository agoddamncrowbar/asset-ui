import { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";

import type { Inspection } from "../api/inspection";

import {
  cancelInspection,
  completeInspection,
  getInspections,
  startInspection,
} from "../api/inspectionService";

import InspectionsTable from "../components/inspections/InspectionsTable";
import CreateInspectionModal from "../components/inspections/CreateInspectionModal";
import PostInspectionResultsModal from "../components/inspections/PostInspectionResultsModal";

export default function Inspections() {
  const { token, user } = useAuth();

  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [loading, setLoading] = useState(true);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [selectedInspection, setSelectedInspection] =
    useState<Inspection | null>(null);

  const [showResultsModal, setShowResultsModal] =
    useState(false);

  useEffect(() => {
    loadInspections();
  }, []);

  async function loadInspections() {
    try {
      setLoading(true);

      const data = await getInspections(token!);

      setInspections(data);
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Failed to load inspections."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleStart(inspection: Inspection) {
    try {
      await startInspection(
        inspection.id,
        token!
      );

      loadInspections();
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Unable to start inspection."
      );
    }
  }

  async function handleComplete(
    inspection: Inspection
  ) {
    try {
      await completeInspection(
        inspection.id,
        {
          user_id: user!.id,
        },
        token!
      );

      loadInspections();
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Unable to complete inspection."
      );
    }
  }

  async function handleCancel(
    inspection: Inspection
  ) {
    if (
      !window.confirm(
        "Cancel this inspection?"
      )
    )
      return;

    try {
      await cancelInspection(
        inspection.id,
        user!.id,
        token!
      );

      loadInspections();
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Unable to cancel inspection."
      );
    }
  }

  function handleRecordResults(
    inspection: Inspection
  ) {
    setSelectedInspection(inspection);
    setShowResultsModal(true);
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Inspections
        </h1>

        <button
          onClick={() =>
            setShowCreateModal(true)
          }
          className="px-4 py-2 rounded bg-blue-600 text-white"
        >
          Create Inspection
        </button>
      </div>

      <InspectionsTable
        inspections={inspections}
        loading={loading}
        onStart={handleStart}
        onComplete={handleComplete}
        onCancel={handleCancel}
        onPostResults={
          handleRecordResults
        }
      />

      <CreateInspectionModal
        isOpen={showCreateModal}
        onClose={() =>
          setShowCreateModal(false)
        }
        onCreated={loadInspections}
      />

      <PostInspectionResultsModal
        isOpen={showResultsModal}
        inspection={selectedInspection}
        onClose={() => {
          setShowResultsModal(false);
          setSelectedInspection(null);
        }}
        onSaved={loadInspections}
      />
    </div>
  );
}