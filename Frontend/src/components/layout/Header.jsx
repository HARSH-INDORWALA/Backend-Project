import { Search, Upload } from "lucide-react";
import { Logo } from "../common";
import { UserMenu } from "../layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Header() {
    const [searchQuery, setsearchQuery] = useState("");
    const navigate = useNavigate();
    const handleSearch = (e) => {
        const query = searchQuery.trim();

        if (!query) return;

        navigate(`/search?q=${encodeURIComponent(query)}`)
    }
    return (
        <header className="sticky top-0 z-50 px-4 py-3">
            <div className="mx-auto flex items-center gap-2 md:gap-4 rounded-2xl md:rounded-3xl border border-border bg-surface px-3 py-2 md:px-6shadow-sm">
                {/* Logo */}
                <div className="hidden md:block shrink-0">
                    <Logo />
                </div>

                <div className="md:hidden shrink-0">
                    <Logo mobile />
                </div>

                {/* Search */}
                <div className="relative flex-1 md:max-w-xl md:mx-auto">
                    <button
                        onClick={handleSearch}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                    >
                        <Search size={18} />
                    </button>

                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => {
                            setsearchQuery(e.target.value)
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch();
                            }
                        }
                        }
                        className=" h-10 w-full rounded-full border border-border bg-background pl-10 pr-3 text-sm text-foreground outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-surface "
                    />
                </div>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-2">
                    <button
                        onClick={() => navigate("/upload")}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition-all duration-200 hover:opacity-90 cursor-pointer md:h-auto md:w-auto md:px-4 md:py-2 md:gap-2"
                    >
                        <Upload size={18} />

                        <span className="hidden md:inline text-sm font-medium">
                            Upload
                        </span>
                    </button>

                    <UserMenu />
                </div>
            </div>
        </header>
    );
}
export default Header;