import { Avatar, Button } from "../common";
import { useToggleSubscription } from "../../hooks/subscription";

function ChannelInfo({ videoId, channelId, isOwner, avatar, channelName, subscribersCount, isSubscribed }) {
    const { mutateAsync: toggleSubrcibe, isPending, error, isError } = useToggleSubscription(videoId);
    return (
        <div className=" flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between " >
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

                    <p className="text-sm text-foreground">
                        {subscribersCount} {subscribersCount === 1 ? "subscriber" : "subscribers"}
                    </p>
                </div>
            </div>

            {!isOwner && (
                <Button
                    onClick={() => toggleSubrcibe(channelId)}
                    disabled={isPending}
                    variant={isSubscribed ? "primary" : "secondary"}
                    className="flex w-auto items-center gap-2 rounded-full px-8">
                    {isPending ? "Updating..." : isSubscribed ? "Subscribed" : "Subscribe"}
                </Button>)
            }
            {isError && (
                <p className="mt-3 text-sm text-red-500">
                    {error?.response?.data?.message ||
                        "Failed to update subscription."}
                </p>
            )}
        </div>
    );
}

export default ChannelInfo;