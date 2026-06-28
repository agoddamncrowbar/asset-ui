export type MaintenancePriority =
  | "low"
  | "medium"
  | "high";

export interface CreateMaintenanceJob {
  asset_id: number;
  inspection_id: number;
  priority: MaintenancePriority;
  issue_report: string;
  assigned_to: number;
  created_by: number;
}

export interface MaintenanceJob {
  id: number;
  asset_id: number;
  inspection_id: number;
  status: string;
  priority: MaintenancePriority;
  issue_report: string;
  assigned_to: number;
  created_by: number;
  created_at: string;
  updated_at: string;
}