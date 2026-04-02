import { create } from "zustand";
import axios from "../lib/axios";
import { FormdataType } from "@/app/(auth)/signup/page";
import { DataType } from "@/app/(auth)/login/page";
import { toast } from "react-toastify";

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
}));

export default useAuthStore;
