export interface Assignment {
  id: number;
  asset_id: number;
  assigned_to: number;
  assigned_by: number;
  assigned_at: string;
  expected_return_date: string | null;
  notes: string | null;
  returned_at: string | null;
  return_notes: string | null;
  status: "active" | "returned";
  created_at: string;
}
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}
export interface AssignmentResponse {
  data: Assignment[];
  pagination: Pagination;
}

export interface ReturnAssignmentPayload {
  return_notes: string;
  condition_status: string;
  processed_by: number;
}