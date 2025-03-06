import { create } from "zustand";

interface AuthUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}
interface StoreState {
  authUser: AuthUser | null;
  setAuthUser: (userData: AuthUser) => void;
}

const useUserStore = create<StoreState>((set, get) => ({
  authUser: null,
  setAuthUser: (userData) => {
    localStorage.setItem("blog-app-user", JSON.stringify(userData));
    set({ authUser: userData });
    const authUser = get().authUser;
    console.log("user has set:", authUser);
  },
}));

export default useUserStore;
