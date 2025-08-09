import { create } from "zustand";
import { IUser } from "../types/User";

interface StoreState {
  authUser: IUser | null;
  setAuthUser: (userData: IUser | null) => void;
}

const useUserStore = create<StoreState>((set, get) => ({
  authUser: JSON.parse(
    localStorage.getItem("blog-app-user") as string
  ),
  setAuthUser: (userData) => {
    localStorage.setItem("blog-app-user", JSON.stringify(userData));
    set({ authUser: userData });
    const authUser = get().authUser;
    console.log("user has set:", authUser);
  },
}));

export default useUserStore;
