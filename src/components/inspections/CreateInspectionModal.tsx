import { useState } from "react";
import Modal from "../ui/Modal";
import { createInspection } from "../../api/inspectionService";
import { useAuth } from "../../auth/useAuth";
import { searchAssets } from "../../api/assetService";
import type { Asset } from "../../api/assets";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export default function CreateInspectionModal({
  isOpen,
  onClose,
  onCreated,
}: Props) {
  const { token, user } = useAuth();

  const [scheduledDate, setScheduledDate] = useState("");
  const [notes, setNotes] = useState("");

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Asset[]>([]);
  const [selectedAssets, setSelectedAssets] = useState<Asset[]>([]);

  const [loadingSearch, setLoadingSearch] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleSearch(value: string) {
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoadingSearch(true);

    const assets = await searchAssets({
      q: value,
      asset_status: "available",
    });

    setResults(
      assets.filter(
        (asset) =>
        !selectedAssets.some((a) => a.id === asset.id)
      )
    );
    } finally {
      setLoadingSearch(false);
    }
  }

  function addAsset(asset: Asset) {
    setSelectedAssets((prev) => [...prev, asset]);
    setResults((prev) => prev.filter((a) => a.id !== asset.id));
    setQuery("");
    setResults([]);
  }

  function removeAsset(id: number) {
    setSelectedAssets((prev) =>
      prev.filter((a) => a.id !== id)
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!scheduledDate) {
      alert("Select a scheduled date.");
      return;
    }

    if (selectedAssets.length === 0) {
      alert("Select at least one asset.");
      return;
    }

    try {
      setSaving(true);

      await createInspection(
        {
          scheduled_date: scheduledDate.replace("T", " "),
          notes,
          created_by: user!.id,
          asset_ids: selectedAssets.map((a) => a.id),
        },
        token!
      );

      setScheduledDate("");
      setNotes("");
      setSelectedAssets([]);
      setQuery("");
      setResults([]);

      onCreated();
      onClose();
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Failed to create inspection."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Inspection"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div>
          <label className="block mb-1 font-medium">
            Scheduled Date
          </label>

          <input
            type="datetime-local"
            className="w-full border rounded px-3 py-2"
            value={scheduledDate}
            onChange={(e) =>
              setScheduledDate(e.target.value)
            }
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Notes
          </label>

          <textarea
            className="w-full border rounded px-3 py-2"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div className="relative">
          <label className="block mb-1 font-medium">
            Search Assets
          </label>

          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Search asset..."
            value={query}
            onChange={(e) =>
              handleSearch(e.target.value)
            }
          />

          {loadingSearch && (
            <p className="text-sm mt-2">Searching...</p>
          )}

          {results.length > 0 && (
            <div className="absolute z-20 mt-1 w-full rounded border bg-white shadow max-h-56 overflow-y-auto">
              {results.map((asset) => (
                <button
                  type="button"
                  key={asset.id}
                  onClick={() => addAsset(asset)}
                  className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                >
                  {asset.asset_tag} — {asset.item_name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Selected Assets
          </label>

          {selectedAssets.length === 0 && (
            <p className="text-sm text-gray-500">
              No assets selected.
            </p>
          )}

          <div className="space-y-2">
            {selectedAssets.map((asset) => (
              <div
                key={asset.id}
                className="flex justify-between items-center border rounded px-3 py-2"
              >
                <div>
                  <div className="font-medium">
                    {asset.asset_tag}
                  </div>
                  <div className="text-sm text-gray-600">
                    {asset.item_name}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    removeAsset(asset.id)
                  }
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
          >
            {saving ? "Creating..." : "Create Inspection"}
          </button>
        </div>
      </form>
    </Modal>
  );
}