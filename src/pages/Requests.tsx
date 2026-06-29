import { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";

import type { Asset } from "../api/assets";
import type { AssetRequest } from "../api/requests";

import { searchAssets } from "../api/assetService";
import {
  createRequest,
  getAssetRequestQueue, approveRequest
} from "../api/requestService";

import {
  AssetsTable,
  RequestAssetModal,
  RequestQueueModal,
} from "../components/request";

export default function Requests() {
  const { token, user } = useAuth();

  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState("");

  const [selectedAsset, setSelectedAsset] =
    useState<Asset | null>(null);

  const [requestOpen, setRequestOpen] =
    useState(false);

  const [queueOpen, setQueueOpen] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [queueLoading, setQueueLoading] =
    useState(false);

  const [queue, setQueue] = useState<
    AssetRequest[]
  >([]);
  
  const [approvingId, setApprovingId] = useState<number | null>(null);
  const isAdmin = user?.role?.toLowerCase() === "admin";

  async function handleApprove(
    request: AssetRequest
    ) {
    if (!token || !user || !selectedAsset) return;

    try {
        setApprovingId(request.id);

        const updated = await approveRequest(
          request.id,
          {
            processed_by: user.id,
          },
          token
        );

        setQueue((current) =>
        current.map((r) =>
            r.id === updated.id ? updated : r
        )
        );

        // Reload the queue because approval may affect
        // queue positions or the next request.
        const refreshed =
        await getAssetRequestQueue(
            selectedAsset.id,
            token
        );

        setQueue(refreshed);
    } catch (err) {
        console.error(err);
    } finally {
        setApprovingId(null);
    }
    }

  async function loadAssets() {
    setLoading(true);

    try {
      const data = await searchAssets({
        q: query,
        asset_status: "assigned",
      });

      setAssets(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAssets();
  }, [query]);

  async function handleCreateRequest(
    reason: string
  ) {
    if (!selectedAsset || !token || !user) return;

    try {
      setSubmitting(true);

      await createRequest(
        {
          asset_id: selectedAsset.id,
          requested_by: user.id,
          reason,
        },
        token
      );

      setRequestOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  async function openQueue(asset: Asset) {
    if (!token) return;

    setSelectedAsset(asset);
    setQueueOpen(true);
    setQueueLoading(true);

    try {
      const data = await getAssetRequestQueue(
        asset.id,
        token
      );

      setQueue(data);
    } catch (err) {
      console.error(err);
      setQueue([]);
    } finally {
      setQueueLoading(false);
    }
  }

  return (
    <div className="space-y-6 mx-5">
    {/* Header */}
    <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-blue-700">
        Asset Requests
        </h1>

        <p className="text-gray-500">
        Search assigned assets and submit transfer requests.
        </p>
    </div>

    {/* Search Card */}
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
            <h2 className="text-lg font-semibold text-gray-800">
            Search Assets
            </h2>

            <p className="text-sm text-gray-500">
            Only assets currently assigned to users are shown.
            </p>
        </div>

        <div className="w-full lg:w-96">
            <input
            type="text"
            placeholder="Search by asset tag, serial number or item name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
        </div>
        </div>
    </div>

    {/* Assets Table */}
    <AssetsTable
        assets={assets}
        loading={loading}
        onRequest={(asset) => {
        setSelectedAsset(asset);
        setRequestOpen(true);
        }}
        onViewQueue={openQueue}
    />

    {/* Request Modal */}
    <RequestAssetModal
        isOpen={requestOpen}
        asset={selectedAsset}
        loading={submitting}
        onClose={() => setRequestOpen(false)}
        onSubmit={handleCreateRequest}
    />

    {/* Queue Modal */}
    <RequestQueueModal
        isOpen={queueOpen}
        onClose={() => setQueueOpen(false)}
        asset={selectedAsset}
        requests={queue}
        loading={queueLoading}
        isAdmin={isAdmin}
        approvingId={approvingId}
        onApprove={handleApprove}
        />
    </div>
  );
}