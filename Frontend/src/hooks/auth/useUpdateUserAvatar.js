import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserAvatar } from "../../services/authService";
import useAuthStore from "../../store/authStore";

export const useUpdateUserAvatar = () => {
    const queryClient = useQueryClient();
    const setUser = useAuthStore((state) => state.setUser);

    return useMutation({
        mutationFn: updateUserAvatar,

        onSuccess: (updatedUser) => {
            setUser(updatedUser);

            queryClient.invalidateQueries({
                queryKey: ["channel"],
            });
        },
    });
};