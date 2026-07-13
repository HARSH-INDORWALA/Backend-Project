import { formatDistanceToNow } from "date-fns";

export const formatRelativeDate = (date) => {
    return formatDistanceToNow(new Date(date), {
        addSuffix: true,
    });
};