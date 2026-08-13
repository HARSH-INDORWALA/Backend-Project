import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

function DescriptionBox({ description }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className=" rounded-2xl border border-border bg-surface p-5 shadow-sm " >
            <p className={` whitespace-pre-line text-sm leading-7 text-slate-700 dark:text-foreground
                    ${expanded
                    ? ""
                    : "line-clamp-3"
                }`}
            >
                {description}
            </p>

            <button
                onClick={() => setExpanded((prev) => !prev)}
                className=" mt-4 flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:opacity-80 " >
                {expanded ? (
                    <>
                        Show Less
                        <ChevronUp size={16} />
                    </>
                ) : (
                    <>
                        Show More
                        <ChevronDown size={16} />
                    </>
                )}
            </button>
        </div>
    );
}

export default DescriptionBox;