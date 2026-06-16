import { SquarePlay } from "lucide-react";
function Logo({ className = "" }) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0066FF] text-white font-bold text-lg">
                <SquarePlay/>
            </div>

            <span className="text-2xl font-bold text-[#0066FF]">
                StreamSphere
            </span>
        </div>
    );
}

export default Logo;