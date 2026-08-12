import { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";

import type { Asset } from "../api/types/assets";
import type { AssetRequest } from "../api/types/requests";

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
    <div className="space-y-5 mx-5">
    {/* Header */}
    <div className="flex flex-col gap-1">
        <h1 className="text-sm font-semibold tracking-tight text-slate-900">
        Asset Requests
        </h1>

        <p className="text-xs font-medium text-slate-400">
        Search assigned assets and submit transfer requests.
        </p>
    </div>

    {/* Search Card */}
    <div className="border border-slate-200 bg-white overflow-hidden">
        <div className="border-b border-slate-200 px-4 py-3">
          <h2 className="text-sm font-semibold tracking-tight text-slate-900">
            Search Assets
          </h2>

          <p className="mt-0.5 text-xs font-medium text-slate-400">
            Only assets currently assigned to users are shown.
          </p>
        </div>

        <div className="px-4 py-4">
          <input
            type="text"
            placeholder="Search by asset tag, serial number or item name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="
              w-full border border-slate-200 px-3 py-2
              text-sm text-slate-900 placeholder:text-slate-400
              transition-colors
              focus:outline-none focus:border-blue-400
            "
          />
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