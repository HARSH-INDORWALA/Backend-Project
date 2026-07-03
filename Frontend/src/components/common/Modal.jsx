import { X } from "lucide-react";

function Modal({
    isOpen,
    onClose,
    title,
    children,
    maxWidth = "max-w-lg",
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className={`relative w-full ${maxWidth} rounded-3xl border border-border bg-surface shadow-2xl`}>
                <div className="flex items-center justify-between border-b border-border p-6">
                    <h2 className="text-2xl font-semibold text-foreground">
                        {title}
                    </h2>

                    <button
                        onClick={onClose}
                        className="rounded-full p-2 text-muted transition-colors hover:bg-background hover:text-foreground"
                    >
                        <X size={22} />
                    </button>
                </div>

                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;