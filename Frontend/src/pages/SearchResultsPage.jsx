import { useSearchParams } from "react-router-dom";

function SearchResultsPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";

    return (
        <section className="space-y-6">
        <div>
            <h1 className="text-2xl font-bold text-foreground">
            Results for "{query}"
            </h1>

            <p className="mt-1 text-sm text-muted">
            {mockVideos.length} videos found
            </p>
        </div>

        <VideoGrid videos={mockVideos} />
        </section>
    );
    
}

export default SearchResultsPage;