import { useState } from "react";
import ChannelBanner from "../components/channel/ChannelBanner";
import ChannelProfile from "../components/channel/ChannelProfile";
import ChannelActions from "../components/channel/ChannelActions";
import mockChannel from "../data/mockChannel";
import ChannelTabs from "../components/channel/ChannelTabs";
import ChannelHome from "../components/channel/ChannelHome";
import ChannelPlaylists from "../components/channel/ChannelPlaylists";
import ChannelAbout from "../components/channel/ChannelAbout";
function ChannelPage() {
    const [activeTab, setActiveTab] = useState("Home");
    return (
        <>
            <ChannelBanner
                banner={mockChannel.banner}
            />

            <div className="mx-auto max-w-7xl">
                <ChannelProfile
                    avatar={mockChannel.avatar}
                    name={mockChannel.name}
                    username={mockChannel.username}
                    subscribers={mockChannel.subscribers}
                    videos={mockChannel.videos}
                    verified={mockChannel.verified}
                />
                <ChannelActions isOwner/>
                <ChannelTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
                {activeTab === "Home" && (
                    <ChannelHome />
                )}

                {activeTab === "Playlists" && (
                    <ChannelPlaylists />
                )}

                {activeTab === "About" && (
                    <ChannelAbout
                        channel={mockChannel}
                    />
                )}
            </div>
        </>
    );
}

export default ChannelPage;