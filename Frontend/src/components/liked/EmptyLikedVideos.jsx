import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

function EmptyLikedVideos() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-border bg-surface px-6 py-20 text-center">
            <div className="mb-6 rounded-full bg-background p-5">
                <Heart
                    size={40}
                    className="fill-primary text-primary"
                />
            </div>

            <h2 className="text-2xl font-semibold text-foreground">
                No liked videos yet
            </h2>

            <p className="mt-3 max-w-md text-muted">
                Videos you like will appear here. Explore StreamSphere and
                like videos to build your collection.
            </p>

            <Button
                className="mt-8 w-auto px-6 py-2"
                onClick={() => navigate("/")}
            >
                Explore Videos
            </Button>
        </div>
    );
}

export default EmptyLikedVideos;