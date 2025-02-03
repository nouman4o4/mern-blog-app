import { create } from "zustand";

interface storeState {
  isSearch: boolean;
  isMobileMenu: boolean;
  turnSeachOn: () => void;
  turnSeachOff: () => void;
  turnMobileMenuOn: () => void;
  turnMobileMenuOff: () => void;
}
const useGlobalStore = create<storeState>((set) => ({
  isSearch: false,
  isMobileMenu: false,

  turnSeachOff: () => {
    set({ isSearch: false });
  },
  turnSeachOn: () => {
    set({ isSearch: true });
  },
  turnMobileMenuOn: () => {
    set({ isMobileMenu: true });
  },
  turnMobileMenuOff: () => {
    set({ isMobileMenu: false });
  },
}));

export default useGlobalStore;
