import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { LoadingSpinner } from "../components/common";

function ProtectedRoute() {

    const { isAuthenticated, isAuthLoading, } = useAuthStore();

    if (isAuthLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
              <LoadingSpinner text="Loading..."/>
            </div>
        );
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />; }

export default ProtectedRoute;