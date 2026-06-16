import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../services/authService.js";

export const useRegister = () => {
    return useMutation({
        mutationFn: registerUser,
    });
};