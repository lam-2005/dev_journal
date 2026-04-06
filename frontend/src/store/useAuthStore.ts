import { create } from "zustand";
import axios from "../lib/axios";
import { FormdataType } from "@/app/(auth)/signup/page";
import { DataType } from "@/app/(auth)/login/page";
import { toast } from "react-toastify";
import { UserType } from "@/interfaces/auth.interface";

type AuthStoreType = {
  authUser: UserType | null;
  isCheckingAuth: boolean;
  isSigningUp: boolean;
  isLoggingIn: boolean;

  checkAuth: () => Promise<void>;
  signup: (data: FormdataType) => Promise<void>;
  login: (data: DataType) => Promise<void>;
  logout: () => Promise<void>;

  userById: UserType | null;
  isGettingUserById: boolean;
  getUserById: (id: string) => Promise<void>;
};

const privateRoute = ["/create-post", "/my-posts"];

const useAuthStore = create<AuthStoreType>((set) => ({
  //check auth
  authUser: null,
  isCheckingAuth: true,
  checkAuth: async () => {
    set({ isCheckingAuth: false });
    try {
      const res = await axios.get("/api/auth/check");
      set({ authUser: res.data });
    } catch (error: any) {
      console.error("Error: ", error.response);
      set({ authUser: null });
      throw error;
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  //signup
  isSigningUp: false,
  signup: async (data: FormdataType) => {
    set({ isSigningUp: true });
    try {
      const res = await axios.post("/api/auth/signup", data);
      set({ authUser: res.data?.data });
      toast.success(res.data?.message);
      return res.data?.success;
    } catch (error: any) {
      toast.error(error.response?.data?.message);
      console.error("Error in signup: ", error.response?.data?.message);
      throw error;
    } finally {
      set({ isSigningUp: false });
    }
  },

  //login
  isLoggingIn: false,
  login: async (data: DataType) => {
    set({ isLoggingIn: true });
    try {
      const res = await axios.post("/api/auth/login", data);
      set({ authUser: res.data?.data });
      toast.success(res.data?.message);
      return res.data?.success;
    } catch (error: any) {
      toast.error(error.response?.data?.message);
      console.error("Error in login: ", error.response?.data?.message);
      throw error;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axios.post("api/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully!");
      const currentPath = window.location.pathname;
      const isPrivateRoute = privateRoute.some((route: string) =>
        currentPath.startsWith(route),
      );
      if (isPrivateRoute) {
        window.location.reload();
      }
    } catch (error) {
      toast.error("Error logging out");
      console.error("Error in logout", error);
    }
  },
  userById: null,
  isGettingUserById: false,
  getUserById: async (id: string) => {
    if (!id) return;
    set({ isGettingUserById: true, userById: null });
    try {
      const res = await axios.get(`/api/auth/${id}`);

      set({ userById: res.data?.data });
    } catch (error: any) {
      console.error(error?.response?.data?.message || "Error getting user");
      set({ userById: null });
      throw error;
    } finally {
      set({ isGettingUserById: false });
    }
  },
}));

export default useAuthStore;
