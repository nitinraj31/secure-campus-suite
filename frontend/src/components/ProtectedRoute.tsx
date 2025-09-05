import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Or a proper loading component
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Normalize user role for comparison
  const normalizedUserRole = user?.role.trim().charAt(0).toUpperCase() + user?.role.trim().slice(1).toLowerCase();

  console.log("ProtectedRoute: user role:", user?.role, "normalized:", normalizedUserRole, "allowedRoles:", allowedRoles);

  if (allowedRoles && user && !allowedRoles.includes(normalizedUserRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
          <p className="text-gray-600">You do not have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
