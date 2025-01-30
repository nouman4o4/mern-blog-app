import { create } from "zustand";

interface storeState {
  isSearch: boolean;
  turnSeachOn: () => void;
  turnSeachOff: () => void;
}
const useGlobalStore = create<storeState>((set) => ({
  isSearch: false,

  turnSeachOff: () => {
    set({ isSearch: false });
  },
  turnSeachOn: () => {
    set({ isSearch: true });
  },
}));

export default useGlobalStore;
