import { CheckCircle } from "lucide-react";
import { useState } from "react";
import Avatar from "../common/Avatar.jsx";
import Button from "../common/Button.jsx";

function ChannelInfo({
    avatar,
    channelName,
    subscribers,
}) {
    const [subscribed, setSubscribed] = useState(false);
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

                        <CheckCircle
                            size={16}
                            className="fill-primary text-primary"
                        />
                    </div>

                    <p className="text-sm text-muted">
                        {subscribers} subscribers
                    </p>
                </div>
            </div>

            <Button
                onClick={() => setSubscribed(!subscribed)}
                variant={subscribed ? "primary" : "secondary"}
                className="
                    flex
                    w-auto
                    items-center
                    gap-2
                    rounded-full
                    px-8
                    py-3
                "
            >
                
                {subscribed ? "Subscribed" : "Subscribe"}
            </Button>
        </div>
    );
}

export default ChannelInfo;