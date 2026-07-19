import { CheckCircle } from "lucide-react";

import Avatar from "../common/Avatar.jsx";
import Button from "../common/Button.jsx";

import { useToggleSubscription } from "../../hooks/subscription";
function ChannelInfo({ videoId, channelId, isOwner, avatar, channelName, subscribersCount, isSubscribed}) {
    const {mutateAsync : toggleSubrcibe, isPending } = useToggleSubscription(videoId);
    return (
        <div
            className="
                flex
                flex-col
                gap-4
                rounded-2xl
                border
                border-border
                bg-surface
                p-5
                shadow-sm
                sm:flex-row
                sm:items-center
                sm:justify-between
            "
        >
            <div className="flex items-center gap-4">
                <Avatar
                    src={avatar}
                    alt={channelName}
                    size="lg"
                />

                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-semibold text-foreground">
                            {channelName}
                        </h2>
                    </div>

                    <p className="text-sm text-muted">
                        {subscribersCount} subscribers
                    </p>
                </div>
            </div>

            {!isOwner && (
                <Button
                    onClick={() => toggleSubrcibe(channelId)}
                    variant={isSubscribed ? "primary" : "secondary"}
                    className="flex w-auto items-center gap-2 rounded-full px-8">
                    {isSubscribed ? "Subscribed" : "Subscribe"}
                </Button>)
            }
        </div>
    );
}

export default ChannelInfo;