import { useSearchParams } from "react-router-dom";

function SearchResultsPage() {
    const [searchParams] = useSearchParams();

    const query = searchParams.get("q");

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">
                Search Results
            </h1>

            <p className="text-muted">
                Query: {query}
            </p>
        </div>
    );
}

export default SearchResultsPage;