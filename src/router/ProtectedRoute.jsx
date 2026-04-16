import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function ProtectedRoute({ children, allowedRoles = [], redirectTo = "/login" }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (allowedRoles.length > 0 && user) {
    const hasPermission = allowedRoles.includes(user.role);

    if (!hasPermission) {
      const roleRedirects = {
        ADMIN: "/admin",
        TELLER: "/teller",
        CS: "/teller",
      };

      return <Navigate to={roleRedirects[user.role] || "/"} replace />;
    }
  }

  return children;
}
