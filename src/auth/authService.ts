const API_URL = import.meta.env.VITE_API_URL;

export interface User {
  id: number;
  university_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  must_change_password: number;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const login = async (
  credentials: LoginPayload
): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};


export const getMe = async (token: string) => {
  const res = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to fetch user");
  }

  return data.user;
};