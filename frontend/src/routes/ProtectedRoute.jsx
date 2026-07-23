import { Navigate, Outlet, useLocation } from "react-router";
import { getUserRole, isAuthenticated } from "../utils/auth";

function ProtectedRoute({ role }) {
  const userRole = getUserRole();
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!role.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
