import { Outlet } from "react-router-dom";
import { Header, NavigationBar, MobileNavigationSheet } from "../components/layout";

function AppLayout() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <NavigationBar />
            <MobileNavigationSheet />
            <main className="px-4 py-4">
                <Outlet />
            </main>
        </div>
    );
}
export default AppLayout; 