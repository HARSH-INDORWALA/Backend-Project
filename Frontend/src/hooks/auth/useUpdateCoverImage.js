import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserCoverImage } from "../../services/authService";
import useAuthStore from "../../store/authStore";

export const useUpdateUserCoverImage = () => {
    const queryClient = useQueryClient();
    const setUser = useAuthStore((state) => state.setUser);

    return useMutation({
        mutationFn: updateUserCoverImage,

        onSuccess: (updatedUser) => {
            setUser(updatedUser);

            queryClient.invalidateQueries({
                queryKey: ["channel"],
            });
        },
    });
};