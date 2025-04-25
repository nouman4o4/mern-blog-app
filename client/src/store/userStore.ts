import { create } from "zustand";

interface AuthUser {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  profileImage: string;
  gender: string;
}
interface StoreState {
  authUser: AuthUser | null;
  setAuthUser: (userData: AuthUser | null) => void;
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
