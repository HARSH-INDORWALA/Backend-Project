import {Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";
import PublicRoute from "./PublicRoutes";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import LikedVideosPage from "../pages/LikedVideosPage.jsx";
import HistoryPage from "../pages/HistoryPage.jsx";
import UploadVideoPage from "../pages/UploadVideoPage.jsx";
import SubscriptionsPage from "../pages/SubscriptionsPage.jsx";
import DashboardPage from "../pages/DashboardPage";
import MyVideosPage from "../pages/MyVideosPage";
import SubscribersPage from "../pages/SubscribersPage";
import PlaylistPage from "../pages/PlaylistPage.jsx";
import AppLayout from "../layouts/AppLayout.jsx";
import SearchPage from "../pages/SearchPage.jsx";
import WatchLayout from "../components/layout/WatchLayout.jsx";
import WatchPage from "../pages/WatchPage.jsx";
import PlaylistDetailsPage from "../pages/PlaylistDetailsPage.jsx";
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
                    element={<ChannelPage  />}
                />
                <Route 
                    path="/channel/:username"
                    element = {<ChannelPage/>}
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
                    element={<UploadVideoPage/>}
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