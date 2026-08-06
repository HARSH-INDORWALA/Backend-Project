import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserDetails } from "../../services/authService";
import useAuthStore from "../../store/authStore";

export const useUpdateUserDetails = () => {
    const queryClient = useQueryClient();
    const setUser = useAuthStore((state) => state.setUser);

    return useMutation({
        mutationFn: updateUserDetails,

        onSuccess: (updatedUser) => {
            setUser(updatedUser);

            queryClient.invalidateQueries({
                queryKey: ["channel"],
            });
        },
    });
};