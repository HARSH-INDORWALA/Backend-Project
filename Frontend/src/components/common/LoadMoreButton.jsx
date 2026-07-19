function LoadMoreButton({ onClick, isLoading }) {
    return (
        <div className="flex justify-center">
            <button
                onClick={onClick}
                disabled={isLoading}
                className="rounded-full border border-border bg-surface px-6 py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:bg-background disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isLoading ? "Loading..." : "Load More"}
            </button>
        </div>
    );
}

export default LoadMoreButton;