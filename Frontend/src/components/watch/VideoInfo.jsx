function VideoInfo ({
    title,
    views,
    uploadTime,
}){
    return (
        <div className="space-y-3">
            <h1
                className="
                    text-3xl
                    font-bold
                    leading-tight
                    tracking-tight
                    text-foreground
                "
            >
                {title}
            </h1>

            <p
                className="
                    text-sm
                    font-medium
                    text-muted
                "
            >
                {views} views • {uploadTime}
            </p>
        </div>
    );
};

export default VideoInfo;