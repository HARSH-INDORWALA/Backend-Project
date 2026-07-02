import { ArrowUpDown } from "lucide-react";

import CommentInput from "./CommentInput";
import CommentCard from "./CommentCard";

import mockComments from "../../data/mockComments";

function CommentsSection() {
    return (
        <section className="space-y-6">

            <div className="flex items-center gap-6">
                <h2 className="text-xl font-semibold text-foreground">
                    {mockComments.length} Comments
                </h2>

                <button className="flex items-center gap-2 text-muted hover:text-foreground">
                    <ArrowUpDown size={18} />
                    Sort by
                </button>
            </div>

            <CommentInput />

            <div className="space-y-8">
                {mockComments.map((comment) => (
                    <CommentCard
                        key={comment.id}
                        {...comment}
                    />
                ))}
            </div>

        </section>
    );
}

export default CommentsSection;