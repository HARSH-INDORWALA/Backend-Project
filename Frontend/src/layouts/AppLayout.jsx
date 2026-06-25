import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import NavigationBar from "../components/layout/NavigationBar";
import MobileNavigationSheet from "../components/layout/MobileNavigationSheet";

export default function AppLayout() {
    return (
        <div className="min-h-screen text-black dark:bg-zinc-950 dark:text-white">
            <Header />
            <NavigationBar/>
            <MobileNavigationSheet/>
            <main className="px-4 py-4">
                <div className="mx-auto max-w-7xl">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}