import { useMutation } from "@tanstack/react-query";
import { incrementView } from "../../services/videoService";

export const useIncrementView = () => {
    return useMutation({
        mutationFn: incrementView,
    });
}