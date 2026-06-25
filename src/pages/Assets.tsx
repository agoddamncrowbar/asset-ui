import { useEffect, useState } from "react";
import { fetchAssets, type Asset } from "../api/assets";
import { useAuth } from "../auth/useAuth";
import Modal from "../components/ui/Modal";
import AssignAssetModal from "../components/assets/AssignAssetModal";
import AppLoader from "../components/loading/AppLoader";
export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [assignOpen, setAssignOpen] = useState(false);
  const [assignAsset, setAssignAsset] = useState<Asset | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const isAdmin = user?.role?.toLowerCase() === "admin";
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleView = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsModalOpen(true);
  };
  const handleAssign = (asset: Asset) => {
    setAssignAsset(asset);
    setAssignOpen(true);
  };
    
  useEffect(() => {
    async function load() {
      try {
        const data = await fetchAssets();
        setAssets(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return <AppLoader />;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">
        Asset Inventory
      </h1>

      <div className="overflow-x-auto border border-blue-200 rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">Tag</th>
              <th className="p-3 text-left">Item</th>
              <th className="p-3 text-left">Serial</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Condition</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {assets.map((asset, idx) => (
              <tr
                key={asset.id}
                className={idx % 2 === 0 ? "bg-white" : "bg-yellow-50"}
              >
                <td className="p-3 font-mono text-blue-700">
                  {asset.asset_tag}
                </td>
                <td className="p-3">{asset.item_name}</td>
                <td className="p-3">{asset.serial_number}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold
                      ${
                        asset.asset_status === "available"
                          ? "bg-blue-100 text-blue-700"
                          : asset.asset_status === "maintenance"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-gray-200 text-gray-700"
                      }`}
                  >
                    {asset.asset_status}
                  </span>
                </td>

                <td className="p-3">{asset.condition_status}</td>

                <td className="p-3">
                    <div className="flex gap-2">
                        <button
                          onClick={() => handleView(asset)}
                          className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                          View
                        </button>

                        {isAdmin && (
                            <button
                                onClick={() => handleAssign(asset)}
                                className="px-3 py-1 text-xs bg-yellow-400 text-black rounded hover:bg-yellow-500"
                            >
                                Assign
                            </button>
                        )}
                        <AssignAssetModal
                            isOpen={assignOpen}
                            onClose={() => setAssignOpen(false)}
                            asset={assignAsset}
                            />

                        <button className="px-3 py-1 text-xs border border-blue-600 text-blue-600 rounded hover:bg-blue-50">
                        Edit
                        </button>
                    </div>
                    </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Asset Details"
        footer={
            <>
            <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
            >
                Close
            </button>

            {user?.role?.toLowerCase() === "admin" && (
                <button className="px-4 py-2 text-sm bg-yellow-400 text-black rounded hover:bg-yellow-500">
                Assign Asset
                </button>
            )}
            </>
        }
        >
        {selectedAsset && (
            <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
                <p className="text-gray-500">Asset Tag</p>
                <p className="font-mono text-blue-700">
                {selectedAsset.asset_tag}
                </p>
            </div>

            <div>
                <p className="text-gray-500">Serial Number</p>
                <p>{selectedAsset.serial_number}</p>
            </div>

            <div>
                <p className="text-gray-500">Item</p>
                <p>{selectedAsset.item_name}</p>
            </div>

            <div>
                <p className="text-gray-500">Status</p>
                <p>{selectedAsset.asset_status}</p>
            </div>

            <div>
                <p className="text-gray-500">Condition</p>
                <p>{selectedAsset.condition_status}</p>
            </div>

            <div>
                <p className="text-gray-500">Supplier</p>
                <p>{selectedAsset.supplier || "N/A"}</p>
            </div>

            <div>
                <p className="text-gray-500">Cost</p>
                <p>{selectedAsset.purchase_cost || "N/A"}</p>
            </div>

            <div>
                <p className="text-gray-500">Purchase Date</p>
                <p>{selectedAsset.purchase_date || "N/A"}</p>
            </div>
            </div>
        )}
        </Modal>
    </div>
  );
}