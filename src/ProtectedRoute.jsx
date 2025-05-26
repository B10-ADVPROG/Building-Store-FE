import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const isAuthenticated = localStorage.getItem("is_authenticated") === "true";
  console.log('ProtectedRoute check:', isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/notloggedin" replace />;
  }

  return <Outlet />;
}
