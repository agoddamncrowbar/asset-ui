export interface MostBorrowedAsset {
  id: number;
  asset_tag: string;
  item_name: string;
  times_borrowed: number;
}

export interface AssetUnderMaintenance {
  id: number;
  asset_tag: string;
  item_name: string;
  status: string;
  priority: string | null;
  issue_report: string;
  assigned_to: number | null;
  started_at: string | null;
}

export interface MaintenanceBacklogEntry {
  status: string;
  priority: string | null;
  total: number;
}

export interface AverageRepairTime {
  average_repair_hours: number | null;
}

export interface OverdueAssignment {
  id: number;
  asset_tag: string;
  item_name: string;
  first_name: string;
  last_name: string;
  email: string;
  assigned_at: string;
  expected_return_date: string;
  days_overdue: number;
}

export interface FrequentBorrower {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  active_assignments: number;
}

export interface AssetValueByCategory {
  id: number;
  name: string;
  asset_count: number;
  total_value: string;
}

export interface AssetValueByDepartment {
  id: number;
  name: string;
  asset_count: number;
  total_value: string;
}

export interface AssetCountByLocation {
  id: number;
  name: string;
  building: string | null;
  room_number: string | null;
  asset_count: number;
}

export interface AssetStatusBreakdown {
  asset_status: string;
  total: number;
}

export interface DepreciationReportEntry {
  id: number;
  asset_tag: string;
  item_name: string;
  purchase_date: string;
  purchase_cost: string | null;
  category_name: string;
  depreciation_period: number;
  age_months: number;
}

export interface NeverAssignedAsset {
  id: number;
  asset_tag: string;
  item_name: string;
  purchase_date: string | null;
  purchase_cost: string | null;
}

export interface NeverInspectedAsset {
  id: number;
  asset_tag: string;
  item_name: string;
  condition_status: string;
}

export interface InspectionCompletionRate {
  total_scheduled: number;
  total_completed: number;
  completion_rate: number;
}

export interface FlaggedInspectionAsset {
  inspection_asset_id: number;
  asset_id: number;
  asset_tag: string;
  item_name: string;
  result: string;
  condition_after: string | null;
  remarks: string | null;
  inspection_code: string;
  completed_date: string | null;
}

export interface PendingRequestSummary {
  id: number;
  asset_tag: string;
  item_name: string;
  pending_requests: number;
}

export interface AverageRequestFulfillmentTime {
  average_fulfillment_hours: number | null;
}

export interface ReportDateRangeParams {
  from?: string;
  to?: string;
}

export interface ReportLimitParams {
  limit?: number;
}