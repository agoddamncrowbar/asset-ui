import type { User } from "./users";

const API_URL = import.meta.env.VITE_API_URL;

export async function suspendUser(
  id: number,
  token: string
) {
  const res = await fetch(
    `${API_URL}/users/${id}/suspend`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.json();
}

export async function activateUser(
  id: number,
  token: string
) {
  const res = await fetch(
    `${API_URL}/users/${id}/activate`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.json();
}


export async function getUsers(token: string): Promise<User[]> {
  const res = await fetch(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await res.json();

  return json.data ?? [];
}

export async function getUser(
  id: number,
  token: string
): Promise<User | null> {
  const res = await fetch(`${API_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await res.json();

  return json.data ?? null;
}

export async function searchUsers(
  query: string,
  token: string
): Promise<User[]> {
  const res = await fetch(
    `${API_URL}/users/search?q=${encodeURIComponent(query)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const json = await res.json();

  return json.data ?? [];
}
export interface CreateUserPayload {
  university_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}

export async function createUser(
  data: CreateUserPayload,
  token: string
) {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Failed to create user");
  }

  return json;
}
export async function deleteUser(
  id: number,
  token: string
) {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Failed to delete user");
  }

  return json;
}