import { create } from "zustand";

const useUIStore = create((set) => ({
    isNavExpanded: true,
    isMobileNavOpen: false,

    expandNav: () =>
        set({ isNavExpanded: true }),

    collapseNav: () =>
        set({ isNavExpanded: false }),

    toggleNav: () =>
        set((state) => ({
            isNavExpanded: !state.isNavExpanded,
        })),

    openMobileNav: () =>
        set({ isMobileNavOpen: true }),

    closeMobileNav: () =>
        set({ isMobileNavOpen: false }),
}));

export default useUIStore;