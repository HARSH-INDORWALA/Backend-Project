import { ListVideo } from "lucide-react";
import Button from "../../common/Button";

function EmptyPlaylist({ isOwner, onAddVideos }) {
    return (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border py-24 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <ListVideo
                    size={38}
                    className="text-primary"
                />
            </div>

            <h2 className="mt-6 text-2xl font-semibold text-foreground">
                This playlist is empty
            </h2>
        </div>
    );
}

export default EmptyPlaylist;