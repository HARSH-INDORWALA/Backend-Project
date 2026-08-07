import { MoreVertical, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function PlaylistVideoActions({ isOwner, onRemove }) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen((prev) => !prev);
    };

    const handleRemove = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setIsOpen(false);
        onRemove?.();
    };

    if (!isOwner) return null;

    return (
        <div
            className="relative"
            ref={menuRef}
        >
            <button
                onClick={toggleMenu}
                className="rounded-full p-2 text-muted transition-colors hover:text-primary"
            >
                <MoreVertical size={18} />
            </button>

            {isOpen && (
                <div className="absolute right-0 w-56 rounded-xl border border-border bg-surface p-2 shadow-lg">
                    <button
                        onClick={handleRemove}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:text-primary"
                    >
                        <Trash2 size={16} />
                        Remove from Playlist
                    </button>
                </div>
            )}
        </div>
    );
}

export default PlaylistVideoActions;