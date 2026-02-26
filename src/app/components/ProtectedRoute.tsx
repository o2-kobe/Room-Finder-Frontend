import type { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import Loading from "./Loading";
import { Navigate, useLocation, useNavigate } from "react-router";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) return <Loading />;

  if (!isAuthenticated)
    return <Navigate to="/login" state={{ from: location }} replace />;

  if (location.pathname === "/add-listing") {
    const allowedRoles = ["hostelManager", "landlord"];
    if (!allowedRoles.includes(user?.role)) {
      return (
        <div className="flex justify-center items-center text-center min-h-screen text-xl font-bold">
          <p>
            You are not eligible to create a listing. <br />
            <button
              onClick={() => navigate("/")}
              className="text-accent cursor-pointer hover:shadow-md underline"
            >
              Click to Go back to home
            </button>
          </p>
        </div>
      );
    }
  }

  return <>{children}</>;
}
