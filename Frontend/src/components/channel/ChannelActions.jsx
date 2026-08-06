import { useState } from "react";
import { Button } from "../common";
import { useToggleSubscription } from "../../hooks/subscription"
import EditProfileModal from "../profile/EditProfileModal.jsx";
function ChannelActions({
    isOwner = false,
    channelId,
    isSubscribed = false
}) {
    const [open, setOpen] = useState(false);

    const { mutate : toggleSubscription, isPending } = useToggleSubscription();

    if (isOwner) {
        return (
            <section className="mt-8 flex justify-center">
                <Button
                    variant="secondary"
                    className="w-auto rounded-full px-8"
                    onClick={()=> setOpen(true)}
                >
                    Edit Profile
                </Button>
                <EditProfileModal
                    isOpen={open}
                    onClose={()=>setOpen(false)}
                />
            </section>
        );
    }

    return (
        <section className="mt-8 flex justify-center">
            <Button
                variant={isSubscribed ? "primary" : "secondary"}
                onClick={() => toggleSubscription(channelId)}
                className="w-auto rounded-full px-8"
                disabled={isPending}
            >
                {isSubscribed ? "Subscribed" : "Subscribe"}
            </Button>
        </section>
    );
}

export default ChannelActions;