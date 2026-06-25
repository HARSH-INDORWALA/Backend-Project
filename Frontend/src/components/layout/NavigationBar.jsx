import { useEffect } from "react";
import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";

import { navigationItems } from "../../constants/navigation";
import useUIStore from "../../store/uiStore";

function NavigationBar() {
    const {
        isNavExpanded,
        collapseNav,
        expandNav,
        openMobileNav,
    } = useUIStore();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 150) {
                collapseNav();
            } else {
                expandNav();
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll
            );
        };
    }, [collapseNav, expandNav]);

    return (
        <div className="sticky top-24 z-40 px-4">
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
                {isNavExpanded ? (
                    <div
                        className="
                            mx-auto
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
                ) : (
                    <div className="inline-block">
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
                            <button
                                onClick={expandNav}
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    px-3
                                    py-2
                                    text-sm
                                    font-medium
                                    text-muted
                                    hover:bg-background
                                "
                            >
                                <Menu size={18} />
                                Menu
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default NavigationBar;