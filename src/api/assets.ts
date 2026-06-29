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


export interface AssetSearchFilters {
  q?: string;
  category_id?: number;
  department_id?: number;
  location_id?: number;
  condition_status?: string;
  asset_status?: string;
}

export interface UpdateAssetPayload {
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