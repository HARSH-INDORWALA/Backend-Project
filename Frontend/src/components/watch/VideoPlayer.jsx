function VideoPlayer({ videoUrl }) {
    return (
        <div className="aspect-video w-full overflow-hidden rounded-2xl border border-border bg-black shadow-sm">
            <div className="aspect-video bg-black">
                <video
                    controls
                    className="h-full w-full object-contain"
                >
                    <source src={videoUrl} />
                </video>
            </div>
        </div>
    );
}

export default VideoPlayer;