import { useQuery } from "@tanstack/react-query";
import { getChannelStats } from "../../services/dashboardService";

export const useChannelStats = () => {
    return useQuery({
        queryKey: ["channelStats"],
        queryFn: getChannelStats,
    });
};