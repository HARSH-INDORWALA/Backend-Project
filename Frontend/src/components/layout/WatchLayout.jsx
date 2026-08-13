import { Outlet } from "react-router-dom";
import { Header, WatchNavigationBar, MobileNavigationSheet } from "../layout";

function WatchLayout() {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <MobileNavigationSheet />

            <div className="mx-auto max-w-400 px-4 sm:px-6 py-5">
                <WatchNavigationBar />
                <Outlet />
            </div>
        </div>
    );
}

export default WatchLayout;