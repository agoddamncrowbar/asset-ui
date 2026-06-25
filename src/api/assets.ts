const API_URL = import.meta.env.VITE_API_URL;

export interface Asset {
  id: number;
  asset_tag: string;
  serial_number: string;
  item_name: string;
  description: string | null;
  category_id: number;
  department_id: number;
  location_id: number;
  purchase_date: string | null;
  purchase_cost: string | null;
  supplier: string | null;
  condition_status: string;
  asset_status: string;
  created_at: string;
  updated_at: string;
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