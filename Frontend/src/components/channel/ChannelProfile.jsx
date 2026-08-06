import { formatViews } from "../../utils/formatViews";
function ChannelProfile({
    avatar,
    name,
    username,
    subscribers,
    totalVideos,
}) {
    return (
        <section className="flex flex-col items-center -mt-24 relative z-10">
            <img
                src={avatar}
                alt={name}
                className="
                    h-40
                    w-40
                    rounded-full
                    border-4
                    border-surface
                    object-cover
                    shadow-lg
                "
            />

            <div className="mt-5 text-center space-y-2">
                <div className="flex items-center justify-center gap-2">
                    <h1 className="text-5xl font-bold text-foreground">
                        {name}
                    </h1>

                    
                </div>

                <div className="flex flex-wrap justify-center gap-3 text-foreground">
                    <span>{username}</span>

                    <span>•</span>

                    <span>{formatViews(subscribers)} Subscribers</span>

                    <span>•</span>

                    <span>{formatViews(totalVideos)} Videos</span>
                </div>
            </div>
        </section>
    );
}

export default ChannelProfile;