export type InspectionStatus =
  | "scheduled"
  | "in_progress"
  | "completed"
  | "cancelled";

export type InspectionResult =
  | "ok"
  | "damaged"
  | "needs_repair"
  | "retire";

export type AssetCondition =
  | "excellent"
  | "good"
  | "fair"
  | "poor"
  | "damaged";

export interface Inspection {
  id: number;
  inspection_code: string;
  scheduled_date: string;
  completed_date: string | null;
  status: InspectionStatus;
  notes: string;
  created_by: number;
  completed_by: number | null;
  created_at: string;
  updated_at: string;
}

export interface InspectionResultRecord {
  id: number;
  inspection_id: number;
  asset_id: number;
  result: InspectionResult;
  condition_after: AssetCondition;
  remarks: string;
  created_at: string;
}