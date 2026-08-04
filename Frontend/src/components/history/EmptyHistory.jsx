import { History } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

function EmptyHistory() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-border bg-surface px-6 py-20 text-center">
            <div className="mb-6 rounded-full bg-background p-5">
                <History
                    size={40}
                    className="text-primary"
                />
            </div>

            <h2 className="text-2xl font-semibold text-foreground">
                No watch history yet
            </h2>

            <p className="mt-3 max-w-md text-muted">
                Videos you watch will appear here. Start exploring and
                discover content you'll love.
            </p>

            <Button
                className="mt-8 w-auto px-6 py-2"
                onClick={() => navigate("/")}
            >
                Explore Videos
            </Button>
        </div>
    );
}

export default EmptyHistory;