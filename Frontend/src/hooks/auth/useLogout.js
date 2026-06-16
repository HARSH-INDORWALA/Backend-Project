import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../../services/authService";
import useAuthStore from "../../store/authStore";

export const useLogout = () => {
    const clearUser = useAuthStore(
        (state) => state.clearUser
    );

    return useMutation({
        mutationFn: logoutUser,

        onSuccess: () => {
            clearUser();
        },
    });
};