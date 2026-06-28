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
    status: MaintenanceStatus;
    priority: MaintenancePriority;
    issue_report: string;
    assigned_to: number;
    started_at: string | null;
    completed_at: string | null;
    resolution_notes: string | null;
    created_by: number;
    created_at: string;
    updated_at: string;
}

export type MaintenanceStatus =
    | "queued"
    | "in_progress"
    | "completed"
    | "cancelled";


export interface UpdateMaintenanceJob {
  status: MaintenanceStatus;
  priority: MaintenancePriority;
  issue_report: string;
}

export interface CompleteMaintenanceJob {
  resolution_notes: string;
}