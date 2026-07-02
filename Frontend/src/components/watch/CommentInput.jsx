import { useState } from "react";
import Button from "../common/Button";

function CommentInput() {
    const [comment, setComment] = useState("");

    return (
        <div className="flex gap-4">
            <img
                src="https://i.pravatar.cc/100?img=10"
                alt="User"
                className="h-10 w-10 rounded-full object-cover"
            />

            <div className="flex-1">
                <input
                    type="text"
                    value={comment}
                    placeholder="Add a comment..."
                    onChange={(e) =>
                        setComment(e.target.value)
                    }
                    className="
                        w-full
                        border-b
                        border-border
                        bg-transparent
                        py-2
                        outline-none
                        text-foreground
                        placeholder:text-muted
                    "
                />

                {comment.trim() && (
                    <div className="mt-4 flex justify-end gap-3">
                        <Button
                            variant="secondary"
                            className="
                                w-auto
                                rounded-full
                                px-6
                                py-2
                            "
                            onClick={() => setComment("")}
                        >
                            Cancel
                        </Button>

                        <Button
                            className="
                                w-auto
                                rounded-full
                                px-6
                                py-2
                            "
                        >
                            Comment
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CommentInput;