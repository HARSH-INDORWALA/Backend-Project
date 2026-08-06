import { Link } from "react-router-dom";
import { useState } from "react";

import Avatar from "../common/Avatar";
import { formatViews } from "../../utils/formatViews";
import { formatTimeAgo } from "../../utils/formatTimeAgo";
import { useToggleSubscription } from "../../hooks/subscription";

function SubscriptionCard({
    channel,
    mode = "subscription",
}) {
    const {
        _id,
        username,
        avatar,
        fullName,
        subscribersCount,
        subscribedAt,
    } = channel;

    const isSubscriberMode = mode === "subscriber";

    const [isSubscribed, setIsSubscribed] = useState(
        !isSubscriberMode
    );

    const {
        mutate: toggleSubscription,
        isPending,
    } = useToggleSubscription();

    const handleToggleSubscription = (event) => {
        event.preventDefault();
        event.stopPropagation();

        toggleSubscription(_id, {
            onSuccess: (response) => {
                setIsSubscribed(response.isSubscribed);
            },
        });
    };

    return (
        <div
            className="
                group
                rounded-2xl
                border
                border-border
                bg-surface
                p-4
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-md
            "
        >
            <Link
                to={`/channel/${username}`}
                className="block"
            >
                {/* Avatar */}
                <div className="flex justify-center">
                    <Avatar
                        src={avatar}
                        alt={fullName}
                        size="xl"
                    />
                </div>

                {/* Channel Info */}
                <div className="mt-2 text-center">
                    <h3
                        className="
                            truncate
                            text-base
                            font-semibold
                            text-foreground
                            transition-colors
                            group-hover:text-primary
                        "
                    >
                        {username}
                    </h3>

                    <p
                        className="
                            mt-1
                            truncate
                            text-sm
                            text-foreground
                        "
                    >
                        {fullName}
                    </p>

                    {isSubscriberMode ? (
                        <p
                            className="
                                mt-1
                                text-xs
                                text-foreground
                            "
                        >
                            Subscribed{" "}
                            {formatTimeAgo(subscribedAt)}
                        </p>
                    ) : (
                        <p
                            className="
                                mt-1
                                text-xs
                                text-foreground
                            "
                        >
                            {formatViews(subscribersCount)}{" "}
                            Subscribers
                        </p>
                    )}
                </div>
            </Link>

            {/* Subscription Button */}
            {!isSubscriberMode && (
                <button
                    type="button"
                    onClick={handleToggleSubscription}
                    disabled={isPending}
                    className={`
                        mt-1
                        w-full
                        rounded-full
                        px-3
                        py-3
                        text-sm
                        font-semibold
                        transition-all
                        duration-200
                        ${
                            isSubscribed
                                ? "bg-primary text-white hover:bg-primary/90"
                                : "border border-border bg-background text-foreground hover:bg-muted"
                        }
                        ${
                            isPending
                                ? "cursor-not-allowed opacity-60"
                                : "cursor-pointer"
                        }
                    `}
                >
                    {isPending
                        ? "Updating..."
                        : isSubscribed
                            ? "Subscribed"
                            : "Subscribe"}
                </button>
            )}
        </div>
    );
}

export default SubscriptionCard;