import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";

import { navigationItems } from "../../constants/navigation";
import useUIStore from "../../store/uiStore";

function WatchNavigationBar() {
    const openMobileNav = useUIStore(
        (state) => state.openMobileNav
    );

    return (
        <div className="mb-6">

            {/* Mobile Navigation */}
            <div className="md:hidden">
                <div
                    className="
                        rounded-2xl
                        border
                        border-border
                        bg-surface
                        p-2
                        shadow-sm
                    "
                >
                    <button
                        onClick={openMobileNav}
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-xl
                            px-3
                            py-2
                            text-sm
                            font-medium
                            text-foreground
                            hover:bg-background
                        "
                    >
                        <Menu size={18} />
                        Menu
                    </button>
                </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
                <div
                    className="
                        rounded-2xl
                        border
                        border-border
                        bg-surface
                        px-3
                        py-2
                        shadow-sm
                    "
                >
                    <div className="flex flex-wrap items-center gap-2">
                        {navigationItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `
                                        flex
                                        items-center
                                        gap-2
                                        rounded-full
                                        px-4
                                        py-2
                                        text-sm
                                        font-medium
                                        transition-all
                                        ${
                                            isActive
                                                ? "bg-primary text-white"
                                                : "bg-background text-muted hover:text-foreground"
                                        }
                                    `
                                    }
                                >
                                    <Icon size={16} />
                                    <span>{item.label}</span>
                                </NavLink>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WatchNavigationBar;