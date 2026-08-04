function groupWatchHistory(history = []) {
    const grouped = {};

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    history.forEach((video) => {
        const watchedDate = new Date(video.watchedAt);

        const normalizedDate = new Date(watchedDate);
        normalizedDate.setHours(0, 0, 0, 0);

        let label;

        if (normalizedDate.getTime() === today.getTime()) {
            label = "Today";
        } else if (
            normalizedDate.getTime() === yesterday.getTime()
        ) {
            label = "Yesterday";
        } else {
            label = watchedDate.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });
        }

        if (!grouped[label]) {
            grouped[label] = [];
        }

        grouped[label].push(video);
    });

    return Object.entries(grouped).map(([label, videos]) => ({
        label,
        videos,
    }));
}

export default groupWatchHistory;