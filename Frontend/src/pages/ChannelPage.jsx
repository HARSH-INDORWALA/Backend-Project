import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { EmptyState, LoadingSpinner } from "../components/common";
import { ChannelAbout, ChannelActions, ChannelBanner, ChannelPlaylists, ChannelHome, ChannelProfile, ChannelTabs } from "../components/channel";
import { useChannel } from "../hooks/auth";
import useAuthStore from "../store/authStore.js";

function ChannelPage() {
    const { username } = useParams();
    const location = useLocation();
    const user = useAuthStore((state) => state.user);
    const isProfilePage = location.pathname === "/profile";
    const channelUsername = isProfilePage ? user?.username : username;

    const { data: channel, isLoading, isError, error } = useChannel(channelUsername);

    const [activeTab, setActiveTab] = useState("Home");

    if (isLoading) {
        return (
            <LoadingSpinner text="Loading channel..." />
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center py-20">
                <p className="text-red-500">
                    {error?.response?.data?.message ||
                        "Failed to load videos."}
                </p>
            </div>
        )
    }

    if (!channel) {
        return (
            <EmptyState
                text="Channel not found"
                description="The channel you are looking for does not exist."
            />
        );
    }

    return (
        <>
            <ChannelBanner
                banner={channel.coverImage}
            />

            <div className="mx-auto">
                <ChannelProfile
                    avatar={channel.avatar}
                    name={channel.fullName}
                    username={channel.username}
                    subscribers={channel.subscriberCount}
                    totalVideos={channel.totalVideos}
                />

                <ChannelActions
                    isOwner={isProfilePage}
                    isSubscribed={channel.isSubscribed}
                    channelId={channel._id}
                />

                <ChannelTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

                {activeTab === "Home" && (
                    <ChannelHome channelId={channel._id} />
                )}

                {activeTab === "Playlists" && (
                    <ChannelPlaylists userId={channel._id} />
                )}

                {activeTab === "About" && (
                    <ChannelAbout
                        channel={channel}
                    />
                )}
            </div>
        </>
    );
}

export default ChannelPage;