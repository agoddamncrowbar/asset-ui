import { http } from "./http";

export interface CreateAssignmentPayload {
  asset_id: number;
  assigned_to: number;
  assigned_by: number;
  expected_return_date: string;
  notes: string;
}

export async function createAssignment(payload: CreateAssignmentPayload) {
  return http<{
    success: boolean;
    message: string;
    data: any;
  }>("/assignments", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}