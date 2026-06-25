import { X } from "lucide-react";
import { NavLink } from "react-router-dom";

import { navigationItems } from "../../constants/navigation.js";
import useUIStore from "../../store/uiStore.js";

function MobileNavigationSheet() {
    const {
        isMobileNavOpen,
        closeMobileNav,
    } = useUIStore();

    if (!isMobileNavOpen) return null;

    return (
        <div
            className="
                fixed
                inset-0
                z-100
                bg-surface
                md:hidden
            "
        >
            <div className="flex items-center justify-between border-b border-border p-4">
                <h2 className="text-lg font-semibold text-foreground">
                    Menu
                </h2>

                <button
                    onClick={closeMobileNav}
                    className="
                        rounded-xl
                        p-2
                        hover:bg-background
                    "
                >
                    <X size={22} />
                </button>
            </div>

            <nav className="p-4">
                <div className="space-y-2">
                    {navigationItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={closeMobileNav}
                                className={({ isActive }) =>
                                    `
                                    flex
                                    items-center
                                    gap-3
                                    rounded-2xl
                                    px-4
                                    py-3
                                    text-base
                                    transition-all
                                    ${
                                        isActive
                                            ? "bg-primary text-white"
                                            : "text-foreground hover:bg-background"
                                    }
                                `
                                }
                            >
                                <Icon size={20} />
                                <span>
                                    {item.label}
                                </span>
                            </NavLink>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
}

export default MobileNavigationSheet;