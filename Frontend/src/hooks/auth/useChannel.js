import { useQuery } from "@tanstack/react-query";

import { getChannelProfile } from "../../services/authService.js";

export const useChannel = (username) => {
    return useQuery({
        queryKey: ["channel", username],

        queryFn: () => getChannelProfile(username),

        enabled: !!username,
    });
};