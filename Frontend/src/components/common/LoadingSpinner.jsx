import { CircularProgress } from "@mui/material";

function LoadingSpinner({
    size = 45,
    className = "",
    text = "Loading...",
}) {
    return (
        <div
            className={`flex flex-col items-center justify-center gap-4 py-10 ${className}`}
        >
            <CircularProgress size={size} />

            {text && (
                <p className="text-sm text-muted-foreground">
                    {text}
                </p>
            )}
        </div>
    );
}

export default LoadingSpinner;