function ChannelAbout({ channel }) {
    return (
        <section
            className="
                mt-8
                rounded-2xl
                border
                border-border
                bg-surface
                p-6
            "
        >
            <h2
                className="
                    mb-6
                    text-xl
                    font-semibold
                    text-foreground
                "
            >
                About
            </h2>

            <div className="space-y-5">

                <div>
                    <p className="text-sm text-muted">
                        Username
                    </p>

                    <p className="text-foreground">
                        @{channel.username}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-muted">
                        Subscribers
                    </p>

                    <p className="text-foreground">
                        {channel.subscribers}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-muted">
                        Videos
                    </p>

                    <p className="text-foreground">
                        {channel.videos}
                    </p>
                </div>

            </div>
        </section>
    );
}

export default ChannelAbout;