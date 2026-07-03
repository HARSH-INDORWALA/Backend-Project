import {Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";
import PublicRoute from "./PublicRoutes";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage.jsx";
import DashboardPage from "../pages/DashboardPage";
import MyVideosPage from "../pages/MyVideosPage";
import SubscribersPage from "../pages/SubscribersPage";
import AppLayout from "../layouts/AppLayout.jsx";
import SearchResultsPage from "../pages/SearchResultsPage.jsx";
import WatchLayout from "../components/layout/WatchLayout.jsx";
import WatchPage from "../pages/WatchPage.jsx";
import ChannelPage from "../pages/ChannelPage.jsx";
function AppRoutes(){
    return (
       <Routes>

            <Route element={<PublicRoute />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>

            <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>

                <Route
                    path="/"
                    element={<HomePage />}
                />

                {/* <Route
                    path="/subscriptions"
                    element={<SubscriptionsPage />}
                />

                <Route
                    path="/playlists"
                    element={<PlaylistsPage />}
                />

                <Route
                    path="/history"
                    element={<HistoryPage />}
                />

                <Route
                    path="/liked"
                    element={<LikedVideosPage />}
                /> */}

                {/* User Menu Routes */}

                 <Route
                    path="/profile"
                    element={<ChannelPage  />}
                />
                <Route 
                    path="/channel/:channelId"
                    element = {<ChannelPage/>}
                />
                {/*
                <Route
                    path="/dashboard"
                    element={<DashboardPage />}
                />

                <Route
                    path="/my-videos"
                    element={<MyVideosPage />}
                />

                <Route
                    path="/subscribers"
                    element={<SubscribersPage />}
                /> */}

                {/* Search */}

                <Route
                    path="/search"
                    element={<SearchResultsPage />}
                />

            </Route>
            <Route element={<WatchLayout/>}>
                <Route 
                    path="/watch/:videoId"
                    element={<WatchPage/>}/>
            </Route>
        </Route>

        </Routes>
    );
}
export default AppRoutes;