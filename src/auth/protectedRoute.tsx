import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import AppLoader from "../components/loading/AppLoader";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return <AppLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}