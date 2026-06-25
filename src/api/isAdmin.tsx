export function isAdmin(user: { role?: string } | null) {
  return user?.role?.toLowerCase() === "admin";
}