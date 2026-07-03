import { useState } from "react";
import Button from "../common/Button.jsx";
import EditProfileModal from "../profile/EditProfileModal.jsx";
function ChannelActions({
    isOwner = false,
}) {
    const [open,setOpen]=useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

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
                onClick={() => setIsSubscribed(!isSubscribed)}
                className="w-auto rounded-full px-8"
            >
                {isSubscribed ? "Subscribed" : "Subscribe"}
            </Button>
        </section>
    );
}

export default ChannelActions;