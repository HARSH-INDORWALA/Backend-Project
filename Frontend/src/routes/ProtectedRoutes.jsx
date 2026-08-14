import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { LoadingSpinner } from "../components/common";

function ProtectedRoute() {
    const location = useLocation();
    const { isAuthenticated, isAuthLoading, } = useAuthStore();

    if (isAuthLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <LoadingSpinner text="Loading..." />
            </div>
        );
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}

export default ProtectedRoute;