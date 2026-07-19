import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function CommentActions({ onEdit, onDelete }) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={menuRef} className="relative">
            <button onClick={() => setIsOpen((prev) => !prev)} className="rounded-full p-2 text-muted transition-colors hover:bg-background hover:text-foreground cursor-pointer">
                <EllipsisVertical size={18} />
            </button>

            {isOpen && (
                <div className="absolute right-0 z-20 mt-2 w-40 overflow-hidden rounded-xl border border-border bg-surface shadow-lg">
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            onEdit();
                        }}
                        className="flex w-full items-center gap-3 px-4 py-3 text-sm text-foreground transition-colors hover:bg-background cursor-pointer"
                    >
                        <Pencil size={16} />
                        Edit
                    </button>

                    <button
                        onClick={() => {
                            setIsOpen(false);
                            onDelete();
                        }}
                        className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-500 transition-colors hover:bg-background cursor-pointer"
                    >
                        <Trash2 size={16} />
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}

export default CommentActions;  