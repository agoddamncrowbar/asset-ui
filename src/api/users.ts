import { http } from "./http";

export interface User {
  id: number;
  university_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  role: string;
  status: string;
  must_change_password: number;
  created_at: string;
  updated_at: string;
}

export async function fetchUsers(): Promise<User[]> {
  const res = await http<{ success: boolean; data: User[] }>("/users");
  return res.data;
}

export async function fetchUserById(id: number): Promise<User> {
  const res = await http<{ success: boolean; data: User }>(`/users/${id}`);
  return res.data;
}