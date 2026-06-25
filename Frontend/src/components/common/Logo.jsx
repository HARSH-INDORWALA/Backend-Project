import { SquarePlay } from "lucide-react";

function Logo({
    className = "",
    mobile = false,
}) {
    return (
        <div
            className={`flex items-center gap-2 ${className}`}
        >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                <SquarePlay />
            </div>

            {!mobile && (
                <span className="text-2xl font-bold text-primary">
                    StreamSphere
                </span>
            )}
        </div>
    );
}

export default Logo;