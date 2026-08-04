import { useState, useRef, useEffect } from "react";
import {
    UserCircle2,
    User,
    LayoutDashboard,
    Video,
    Users,
    LogOut,
    ChevronDown,
    Moon,
    Sun,
} from "lucide-react";

import { Link } from "react-router-dom";

import {useLogout} from "../../hooks/auth/useLogout.js";
import useThemeStore from "../../store/themeStore";
import useAuthStore from "../../store/authStore";

function UserMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const menuRef = useRef(null);

    const { logout } = useLogout();

    const { theme, toggleTheme } = useThemeStore();

    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);
    return (
        <div
            ref={menuRef}
            className="relative"
        >
            {/* Trigger */}
            <button
                onClick={() =>
                    setIsOpen((prev) => !prev)
                }
                className="
                    flex
                    items-center
                    gap-1
                    rounded-full
                    border
                    border-border
                    p-1.5
                    transition-colors
                    hover:bg-background
                "
            >
                {user?.avatar ? (
                    <img
                        src={user.avatar}
                        alt={user.username}
                        className="
                            h-8
                            w-8
                            rounded-full
                            object-cover
                        "
                    />
                ) : (
                    <UserCircle2
                        size={30}
                        className="text-foreground"
                    />
                )}

                <ChevronDown
                    size={16}
                    className="hidden md:block"
                />
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div
                    className="
                        absolute
                        right-0
                        mt-2
                        w-72
                        overflow-hidden
                        rounded-2xl
                        border
                        border-border
                        bg-surface
                        shadow-lg
                    "
                >
                    {/* User Info */}
                    <div className="border-b border-border p-4">
                        <div className="flex items-center gap-3">
                            {user?.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt={user.username}
                                    className="
                                        h-12
                                        w-12
                                        rounded-full
                                        object-cover
                                    "
                                />
                            ) : (
                                <UserCircle2
                                    size={48}
                                    className="text-muted"
                                />
                            )}

                            <div className="min-w-0">
                                <p className="font-medium text-foreground truncate">
                                    {user?.fullName}
                                </p>

                                <p className="text-sm text-foreground truncate">
                                    {user?.username}
                                </p>

                                <p className="text-xs text-foreground truncate">
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2 text-foreground">
                        <Link
                            to="/profile"
                            onClick={() => setIsOpen(false)}
                            className="
                                flex
                                items-center
                                gap-3
                                rounded-xl
                                px-3
                                py-2
                                hover:bg-background
                            "
                        >
                            <User size={18} />
                            Profile
                        </Link>

                        <Link
                            to="/dashboard"
                            onClick={() => setIsOpen(false)}
                            className="
                                flex
                                items-center
                                gap-3
                                rounded-xl
                                px-3
                                py-2
                                hover:bg-background
                            "
                        >
                            <LayoutDashboard size={18} />
                            Dashboard
                        </Link>

                        <Link
                            to="/my-videos"
                            onClick={() => setIsOpen(false)}
                            className="
                                flex
                                items-center
                                gap-3
                                rounded-xl
                                px-3
                                py-2
                                hover:bg-background
                            "
                        >
                            <Video size={18} />
                            My Videos
                        </Link>

                        <Link
                            to="/subscribers"
                            onClick={() => setIsOpen(false)}
                            className="
                                flex
                                items-center
                                gap-3
                                rounded-xl
                                px-3
                                py-2
                                hover:bg-background
                            "
                        >
                            <Users size={18} />
                            Subscribers
                        </Link>

                        <div className="my-2 border-t border-border" />
                        
                        <button
                            onClick={toggleTheme}
                            className="
                                flex
                                w-full
                                items-center
                                gap-3
                                rounded-xl
                                px-3
                                py-2
                                text-left
                                hover:bg-background
                            "
                        >
                            {theme === "dark" ? (
                                <Sun size={18} />
                            ) : (
                                <Moon size={18} />
                            )}

                            <span>
                                {theme === "dark"
                                    ? "Light Mode"
                                    : "Dark Mode"}
                            </span>
                        </button>

                        <div className="my-2 border-t border-border" />

                        <button
                            onClick={logout}
                            className="
                                flex
                                w-full
                                items-center
                                gap-3
                                rounded-xl
                                px-3
                                py-2
                                text-left
                                text-red-500
                                hover:bg-background
                            "
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserMenu;