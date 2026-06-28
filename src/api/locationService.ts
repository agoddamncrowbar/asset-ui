import type { Location } from "./location";

const API_URL = import.meta.env.VITE_API_URL;

export interface CreateLocationPayload {
  name: string;
  building: string;
  room_number: string;
  description: string;
}

export async function getLocations(
  token: string
): Promise<Location[]> {
  const res = await fetch(
    `${API_URL}/locations`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const json = await res.json();

  return json.data ?? [];
}

export async function getLocation(
  id: number,
  token: string
): Promise<Location | null> {
  const res = await fetch(
    `${API_URL}/locations/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const json = await res.json();

  return json.data ?? null;
}

export async function createLocation(
  data: CreateLocationPayload,
  token: string
) {
  const res = await fetch(
    `${API_URL}/locations`,
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
      json.message || "Failed to create location"
    );
  }

  return json;
}

export async function deleteLocation(
  id: number,
  token: string
) {
  const res = await fetch(
    `${API_URL}/locations/${id}`,
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
      json.message || "Failed to delete location"
    );
  }

  return json;
}