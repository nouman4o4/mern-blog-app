import { create } from "zustand";
import { IPost } from "../types/Post";

interface storeState {
  isSearch: boolean;
  isMobileMenu: boolean;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  turnSeachOn: () => void;
  turnSeachOff: () => void;
  turnMobileMenuOn: () => void;
  turnMobileMenuOff: () => void;
  searchedBlogs: IPost[];
  setSearchedBlogs: (data: IPost[]) => void;
}
const useGlobalStore = create<storeState>((set) => ({
  isSearch: false,
  isMobileMenu: false,
  isLoading: false,
  searchedBlogs: [],

  setIsLoading: (value) => {
    set({ isLoading: value });
  },

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
  setSearchedBlogs: (data) => {
    set({ searchedBlogs: data });
    console.log("serachedblogs set to: ", data);
  },
}));

export default useGlobalStore;
