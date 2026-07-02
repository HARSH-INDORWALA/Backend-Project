function VideoPlayer ({ thumbnail }){
    return (
        <div
            className="
                overflow-hidden
                rounded-2xl
                border
                border-border
                bg-black
                shadow-sm
            "
        >
            <div className="aspect-video">
                <img
                    src={thumbnail}
                    alt="Video Thumbnail"
                    className="
                        h-full
                        w-full
                        object-cover
                    "
                />
            </div>
        </div>
    );
};

export default VideoPlayer;