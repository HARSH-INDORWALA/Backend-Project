import { useQuery } from "@tanstack/react-query";
import { getWatchHistory } from "../../services/authService";

export const useWatchHistory = () => {
    return useQuery({
        queryKey: ["watch-history"],
        queryFn: getWatchHistory,
    });
};