import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";

export function RequireAuth() {
  const { isAuthenticated } = useApp();
  const loc = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: loc.pathname }} />;
  }
  return <Outlet />;
}

export function RequireRole() {
  const { role, isAuthenticated } = useApp();
  const loc = useLocation();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!role) return <Navigate to="/role" replace state={{ from: loc.pathname }} />;
  return <Outlet />;
}
