import { Outlet } from "react-router-dom";

import Header from "./Header";
import WatchNavigationBar from "./watchNavigationBar.jsx";
import MobileNavigationSheet from "./MobileNavigationSheet";

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