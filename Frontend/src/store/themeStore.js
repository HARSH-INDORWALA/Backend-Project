import { create } from "zustand";

const useThemeStore = create((set, get) => ({
    theme: localStorage.getItem("theme") || "light",

    setTheme: (theme) => {
        localStorage.setItem("theme", theme);

        document.documentElement.classList.toggle(
            "dark",
            theme === "dark"
        );

        set({ theme });
    },

    toggleTheme: () => {
        const newTheme =
            get().theme === "light"
                ? "dark"
                : "light";

        localStorage.setItem("theme", newTheme);

        document.documentElement.classList.toggle(
            "dark",
            newTheme === "dark"
        );

        set({ theme: newTheme });
    },
}));

export default useThemeStore;