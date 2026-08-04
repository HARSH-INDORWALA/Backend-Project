import { Trash2 } from "lucide-react";
import Button from "../common/Button";

function HistoryVideoActions({ onRemove }) {
    return (
        <div className="absolute right-0 top-10 z-20 w-56 rounded-2xl border border-border bg-surface p-2 shadow-xl">
            <Button
                variant="ghost"
                onClick={onRemove}
                className="flex w-full items-center justify-start gap-3 rounded-xl border-0 bg-transparent px-3 py-2 text-foreground shadow-none hover:bg-background"
            >
                <Trash2 size={18} />
                Remove from history
            </Button>
        </div>
    );
}

export default HistoryVideoActions;