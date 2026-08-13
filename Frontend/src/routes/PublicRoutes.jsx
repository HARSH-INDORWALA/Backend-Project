import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";

function PublicRoute() {
    const isAuthenticated = useAuthStore(
        (state) => state.isAuthenticated
    );

    return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}

export default PublicRoute;