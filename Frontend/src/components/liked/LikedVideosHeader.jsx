import { Heart } from "lucide-react";

function LikedVideosHeader({ totalVideos }) {
    return (
        <div className="flex flex-col gap-4 pb-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3.5">
                    <Heart
                        size={40}
                        className="fill-primary text-primary"
                    />
                </div>

                <div>
                    <h1 className="text-3xl font-bold text-foreground">
                        Liked Videos
                    </h1>

                    <p className="text-xl mt-1 text-foreground">
                        {totalVideos}{" "}
                        {totalVideos === 1 ? "video" : "videos"}
                    </p>
                </div>
            </div>
        </div>

    );
}

export default LikedVideosHeader;