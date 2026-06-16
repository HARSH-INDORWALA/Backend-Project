import { useEffect } from "react";
import { useCurrentUser } from "../../hooks/auth/useCurrentUser";
import useAuthStore from "../../store/authStore";

function AuthInitializer({ children }) {
    const { data, isSuccess } = useCurrentUser();

    const setUser = useAuthStore(
        (state) => state.setUser
    );

    useEffect(() => {
        if (isSuccess && data?.data) {
            setUser(data.data);
        }
    }, [isSuccess, data, setUser]);

    return children;
}

export default AuthInitializer;