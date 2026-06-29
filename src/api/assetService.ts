import type { Asset } from "./assets";
import type { AssetSearchFilters, UpdateAssetPayload } from "./assets";

const API_URL = import.meta.env.VITE_API_URL;

export interface CreateAssetPayload {
  item_name: string;
  serial_number: string;
  description: string;

  category_id: number;
  department_id: number;
  location_id: number;

  purchase_date: string;
  purchase_cost: number;

  supplier: string;

  condition_status: string;
}

export async function createAsset(
  data: CreateAssetPayload,
  token: string
) {
  const res = await fetch(
    `${API_URL}/assets`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(
      json.message ?? "Failed to create asset"
    );
  }

  return json.data as Asset;
}

export async function fetchAssets(): Promise<Asset[]> {
  const res = await fetch(`${API_URL}/assets`);

  if (!res.ok) {
    throw new Error("Failed to fetch assets");
  }

  const json = await res.json();
  return json.data;
}
export async function fetchAssetById(id: number): Promise<Asset> {
  const res = await fetch(`${API_URL}/assets/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch asset");
  }

  const json = await res.json();
  return json.data;
}
export async function searchAssets(
  filters: AssetSearchFilters
): Promise<Asset[]> {
  const params = new URLSearchParams();

  if (filters.q) {
    params.set("q", filters.q);
  }

  if (filters.category_id) {
    params.set(
      "category_id",
      filters.category_id.toString()
    );
  }

  if (filters.department_id) {
    params.set(
      "department_id",
      filters.department_id.toString()
    );
  }

  if (filters.location_id) {
    params.set(
      "location_id",
      filters.location_id.toString()
    );
  }

  if (filters.condition_status) {
    params.set(
      "condition_status",
      filters.condition_status
    );
  }

  if (filters.asset_status) {
    params.set(
      "asset_status",
      filters.asset_status
    );
  }

  const res = await fetch(
    `${API_URL}/assets/search?${params.toString()}`
  );

  if (!res.ok) {
    throw new Error("Failed to search assets");
  }

  const json = await res.json();

  return json.data;
}

export async function updateAsset(
  assetId: number,
  data: UpdateAssetPayload,
  token: string
): Promise<Asset> {
  const res = await fetch(
    `${API_URL}/assets/${assetId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(
      json.message || "Failed to update asset"
    );
  }

  return json.data;
}