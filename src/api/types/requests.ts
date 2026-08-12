export type RequestStatus =
  | "queued"
  | "approved"
  | "rejected"
  | "cancelled";

export interface AssetRequest {
  id: number;
  asset_id: number;
  requested_by: number;
  reason: string;

  status: RequestStatus;
  queue_position: number;

  requested_at: string;
  updated_at: string | null;

  processed_by: number | null;
  processed_at: string | null;
}

export interface CreateRequestPayload {
  asset_id: number;
  requested_by: number;
  reason: string;
}

export interface ApproveRequestPayload {
  processed_by: number;
}