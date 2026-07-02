import { useEffect } from "react";
import { useCurrentUser } from "../../hooks/auth/useCurrentUser";
import useAuthStore from "../../store/authStore";

function AuthInitializer({ children }) {
    const {
        data,
        isSuccess,
        isError,
        isLoading,
    } = useCurrentUser();

    const {
        setUser,
        clearUser,
        setAuthLoading,
    } = useAuthStore();

    useEffect(() => {
        if (isLoading) return;

        if (isSuccess && data?.data) {
            setUser(data.data);
        }

        if (isError) {
            clearUser();
        }

        setAuthLoading(false);

    }, [
        isLoading,
        isSuccess,
        isError,
        data,
        setUser,
        clearUser,
        setAuthLoading,
    ]);

    return children;
}

export default AuthInitializer;