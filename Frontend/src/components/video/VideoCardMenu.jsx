import { useEffect, useRef, useState } from "react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

function VideoCardMenu({ onEdit, onDelete }) {
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
        <div
            ref={menuRef}
            className="relative"
            onClick={(e) => e.preventDefault()}
        >
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsOpen((prev) => !prev);
                }}
                className="cursor-pointer rounded-full p-2 text-foreground transition-colors hover:bg-background hover:text-foreground"
            >
                <MoreVertical size={18} />
            </button>

            {isOpen && (
                <div className="absolute bottom-full right-0 z-50 mb-2 w-40 overflow-hidden rounded-xl border border-border bg-surface shadow-lg">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsOpen(false);
                            onEdit?.();
                        }}
                        className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-sm text-foreground transition-colors hover:bg-background"
                    >
                        <Pencil size={16} />
                        Edit
                    </button>

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsOpen(false);
                            onDelete?.();
                        }}
                        className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-sm text-red-500 transition-colors hover:bg-background"
                    >
                        <Trash2 size={16} />
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}

export default VideoCardMenu;