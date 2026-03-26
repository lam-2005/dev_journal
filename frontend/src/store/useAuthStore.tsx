import { create } from "zustand";
import axios from "../lib/axios";
import { FormdataType } from "@/app/(auth)/signup/page";
import { DataType } from "@/app/(auth)/login/page";

type UserType = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  background?: string;
  introduction?: string;
};

type AuthStoreType = {
  authUser: UserType | null;
  isCheckingAuth: boolean;
  isSigningUp: boolean;
  isLoggingIn: boolean;

  checkAuth: () => Promise<void>;
  signup: (data: FormdataType) => Promise<void>;
  login: (data: DataType) => Promise<void>;
};

const useAuthStore = create<AuthStoreType>((set) => ({
  //check auth
  authUser: null,
  isCheckingAuth: true,
  checkAuth: async () => {},

  //signup
  isSigningUp: false,
  signup: async (data: FormdataType) => {
    set({ isSigningUp: true });
    try {
      const res = await axios.post("/api/auth/signup", data);
      set({ authUser: res.data?.data });
    } catch (error: any) {
      console.error("Error in signup:", error.response);
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
    } catch (error: any) {
      console.error("Error in login", error.response);
    } finally {
      set({ isLoggingIn: false });
    }
  },
}));

export default useAuthStore;
