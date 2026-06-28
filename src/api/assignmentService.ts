import { http } from "./http";
import type { Assignment, AssignmentResponse, ReturnAssignmentPayload } from "./assignments";

const API_URL = import.meta.env.VITE_API_URL;


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

export async function fetchAssignments(
  token: string,
  page = 1,
  limit = 10
): Promise<AssignmentResponse> {
  const res = await fetch(
    `${API_URL}/assignments?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(
      json.message ??
      "Failed to fetch assignments"
    );
  }

  return {
    data: json.data,
    pagination: json.pagination,
  };
}

export async function fetchAssignmentById(
  id: number,
  token: string
): Promise<Assignment> {
  const res = await fetch(
    `${API_URL}/assignments/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(
      json.message ??
      "Failed to fetch assignment"
    );
  }

  return json.data;
}

export async function returnAssignment(
  assignmentId: number,
  data: ReturnAssignmentPayload,
  token: string
) {
  const res = await fetch(
    `${API_URL}/assignments/${assignmentId}/return`,
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
      json.message ??
      "Failed to return assignment"
    );
  }

  return json.data;
}

export async function fetchUserAssignments(
  userId: number,
  token: string
): Promise<Assignment[]> {
  const res = await fetch(
    `${API_URL}/users/${userId}/assignments`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(
      json.message ??
      "Failed to fetch user assignments"
    );
  }

  return json.data;
}