import type { User } from "./auth";

export const isAdmin = (user: User | null) => {
  return user?.role?.toLowerCase() === "admin";
};

export const hasRole = (user: User | null, role: string) => {
  return user?.role?.toLowerCase() === role.toLowerCase();
};