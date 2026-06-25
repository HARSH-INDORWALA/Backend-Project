import useThemeStore from "../store/themeStore.js";

export default function ThemeTest() {
    const { theme, toggleTheme } = useThemeStore();

    return (
        <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
            <button
                onClick={toggleTheme}
                className="border p-2 m-4"
            >
                Current Theme: {theme}
            </button>

            <h1 className="text-4xl p-4">
                Theme Test
            </h1>
        </div>
    );
}