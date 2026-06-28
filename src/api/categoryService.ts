import type { Category } from "./category";

const API_URL = import.meta.env.VITE_API_URL;

export interface CreateCategoryPayload {
  name: string;
  description: string;
  depreciation_period: number;
}

export async function getCategories(
  token: string
): Promise<Category[]> {
  const res = await fetch(
    `${API_URL}/categories`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const json = await res.json();

  return json.data ?? [];
}

export async function getCategory(
  id: number,
  token: string
): Promise<Category | null> {
  const res = await fetch(
    `${API_URL}/categories/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const json = await res.json();

  return json.data ?? null;
}

export async function createCategory(
  data: CreateCategoryPayload,
  token: string
) {
  const res = await fetch(
    `${API_URL}/categories`,
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
      json.message || "Failed to create category"
    );
  }

  return json;
}

export async function deleteCategory(
  id: number,
  token: string
) {
  const res = await fetch(
    `${API_URL}/categories/${id}`,
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
      json.message || "Failed to delete category"
    );
  }

  return json;
}