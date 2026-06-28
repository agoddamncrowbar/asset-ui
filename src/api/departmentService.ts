import type { Department } from "./department";

const API_URL = import.meta.env.VITE_API_URL;

export interface CreateDepartmentPayload {
  name: string;
  code: string;
  description: string;
}

export async function getDepartments(
  token: string
): Promise<Department[]> {
  const res = await fetch(
    `${API_URL}/departments`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const json = await res.json();

  return json.data ?? [];
}

export async function getDepartment(
  id: number,
  token: string
): Promise<Department | null> {
  const res = await fetch(
    `${API_URL}/departments/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const json = await res.json();

  return json.data ?? null;
}

export async function createDepartment(
  data: CreateDepartmentPayload,
  token: string
) {
  const res = await fetch(
    `${API_URL}/departments`,
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
      json.message || "Failed to create department"
    );
  }

  return json;
}

export async function deleteDepartment(
  id: number,
  token: string
) {
  const res = await fetch(
    `${API_URL}/departments/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(
      json.message || "Failed to delete department"
    );
  }

  return json;
}