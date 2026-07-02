import { create } from "zustand";

const useAuthStore = create((set) => ({
    user: null,

    isAuthenticated: false,

    isAuthLoading: true,

    setUser: (user) =>
        set({
            user,
            isAuthenticated: true,
        }),

    clearUser: () =>
        set({
            user: null,
            isAuthenticated: false,
        }),

    setAuthLoading: (loading) =>
        set({
            isAuthLoading: loading,
        }),
}));

export default useAuthStore;