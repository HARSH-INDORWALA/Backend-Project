import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../services/authService.js";
import useAuthStore from "../../store/authStore.js";

export const useLogin = () => {
    const setUser = useAuthStore((state) => state.setUser);

    return useMutation({
        mutationFn: loginUser,

        onSuccess: (response) => {
            setUser(response.data.user);
        },
    });
};