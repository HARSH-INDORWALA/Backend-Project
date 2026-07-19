import { MessageCircle } from "lucide-react";

function EmptyComments() {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface px-6 py-14 text-center">
            <MessageCircle size={42} className="mb-4 text-muted" />

            <h3 className="text-lg font-semibold text-foreground">
                No comments yet
            </h3>

            <p className="mt-2 text-sm text-muted">
                Be the first to share your thoughts.
            </p>
        </div>
    );
}

export default EmptyComments;