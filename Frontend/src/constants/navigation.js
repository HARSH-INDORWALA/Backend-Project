import {
    Home,
    Users,
    ListVideo,
    History,
    ThumbsUp,
} from "lucide-react";

export const navigationItems = [
    {
        label: "Home",
        path: "/",
        icon: Home,
    },
    {
        label: "Subscriptions",
        path: "/subscriptions",
        icon: Users,
    },
    {
        label: "Playlists",
        path: "/playlists",
        icon: ListVideo,
    },
    {
        label: "History",
        path: "/history",
        icon: History,
    },
    {
        label: "Liked Videos",
        path: "/liked-videos",
        icon: ThumbsUp,
    },
];