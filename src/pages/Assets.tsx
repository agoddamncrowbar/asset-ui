import { useEffect, useState } from "react";
import { searchAssets, fetchAssets } from "../api/assetService";
import type { Asset } from "../api/assets";
import AppLoader from "../components/loading/AppLoader";

import { useAuth } from "../auth/useAuth";

import Modal from "../components/ui/Modal";
import AssignAssetModal from "../components/assets/AssignAssetModal";
import CreateAssetModal from "../components/assets/CreateAssetModal";
import AssetsHeader from "../components/assets/AssetsHeader";
import AssetsTable from "../components/assets/AssetsTable";

import { createAsset, type CreateAssetPayload,} from "../api/assetService";
import { getCategories,} from "../api/categoryService";
import { getDepartments,} from "../api/departmentService";
import { getLocations,} from "../api/locationService";

import type { Category } from "../api/category";
import type { Department } from "../api/department";
import type { Location } from "../api/location";


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
  const { token } = useAuth();

  const [createOpen, setCreateOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [search, setSearch] = useState("");

  const [categoryId, setCategoryId] = useState<number | undefined>();
  const [departmentId, setDepartmentId] = useState<number | undefined>();
  const [locationId, setLocationId] = useState<number | undefined>();
  const [conditionStatus, setConditionStatus] = useState("");
  const [assetStatus, setAssetStatus] = useState("");
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
        const [
          assetsData,
          categoriesData,
          departmentsData,
          locationsData,
        ] = await Promise.all([
          fetchAssets(),
          getCategories(token!),
          getDepartments(token!),
          getLocations(token!),
        ]);

        setAssets(assetsData);
        setCategories(categoriesData);
        setDepartments(departmentsData);
        setLocations(locationsData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [token]);


  useEffect(() => {
    const timeout = setTimeout(async () => {
      try {
        const results = await searchAssets({
          q: search,
          category_id: categoryId,
          department_id: departmentId,
          location_id: locationId,
          condition_status: conditionStatus,
          asset_status: assetStatus,
        });

        setAssets(results);
      } catch (err) {
        console.error(err);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [
    search,
    categoryId,
    departmentId,
    locationId,
    conditionStatus,
    assetStatus,
  ]);




  async function handleCreateAsset(
    data: CreateAssetPayload
  ) {
    try {
      setCreating(true);

      const asset = await createAsset(
        data,
        token!
      );

      setAssets((current) => [
        asset,
        ...current,
      ]);

      setCreateOpen(false);
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to create asset"
      );
    } finally {
      setCreating(false);
    }
  }
  const loadAssets = async () => {
    try {
      const data = await fetchAssets();
      setAssets(data);
    } catch (err) {
      console.error(err);
    }
  };
  if (loading) {
    return <AppLoader />;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      <AssetsHeader
        isAdmin={isAdmin}
        onCreate={() => setCreateOpen(true)}
        search={search}
        onSearchChange={setSearch}
        categories={categories}
        departments={departments}
        locations={locations}
        categoryId={categoryId}
        departmentId={departmentId}
        locationId={locationId}
        conditionStatus={conditionStatus}
        assetStatus={assetStatus}
        onCategoryChange={setCategoryId}
        onDepartmentChange={setDepartmentId}
        onLocationChange={setLocationId}
        onConditionChange={setConditionStatus}
        onAssetStatusChange={setAssetStatus}
      />

      <AssetsTable
        assets={assets}
        isAdmin={isAdmin}
        onView={handleView}
        onAssign={handleAssign}
      />
      <AssignAssetModal
        isOpen={assignOpen}
        onClose={() => setAssignOpen(false)}
        asset={assignAsset}
        onAssigned={loadAssets}
      />
      <CreateAssetModal
        open={createOpen}
        loading={creating}
        categories={categories}
        departments={departments}
        locations={locations}
        onClose={() => setCreateOpen(false)}
        onSubmit={handleCreateAsset}
      />
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