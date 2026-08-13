import { Routes, Route } from "react-router-dom";
import {
         LoginPage, RegisterPage, HomePage, WatchPage, HistoryPage, 
         LikedVideosPage, ChannelPage, SubscribersPage, SubscriptionsPage, UploadVideoPage,
         SearchPage, PlaylistDetailsPage, PlaylistPage, DashboardPage, MyVideosPage
} from "../pages";
import ProtectedRoute from "./ProtectedRoutes";
import PublicRoute from "./PublicRoutes";
import AppLayout from "../layouts/AppLayout.jsx";
import WatchLayout from "../components/layout/WatchLayout.jsx";

function AppRoutes() {
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

                    <Route
                        path="/subscriptions"
                        element={<SubscriptionsPage />}
                    />

                    <Route
                        path="/playlists"
                        element={<PlaylistPage />}
                    />
                    <Route
                        path="/playlists/:playlistId"
                        element={<PlaylistDetailsPage />}
                    />

                    <Route
                        path="/history"
                        element={<HistoryPage />}
                    />

                    <Route
                        path="/liked-videos"
                        element={<LikedVideosPage />}
                    />

                    {/* User Menu Routes */}

                    <Route
                        path="/profile"
                        element={<ChannelPage />}
                    />
                    <Route
                        path="/channel/:username"
                        element={<ChannelPage />}
                    />

                    <Route
                        path="/my-videos"
                        element={<MyVideosPage />}
                    />


                    <Route
                        path="/dashboard"
                        element={<DashboardPage />}
                    />



                    <Route
                        path="/subscribers"
                        element={<SubscribersPage />}
                    />
                    {/* Search */}

                    <Route
                        path="/search"
                        element={<SearchPage />}
                    />

                    <Route
                        path="/upload"
                        element={<UploadVideoPage />}
                    />

                </Route>
                <Route element={<WatchLayout />}>
                    <Route
                        path="/watch/:videoId"
                        element={<WatchPage />} />
                </Route>
            </Route>

        </Routes>
    );
}
export default AppRoutes;