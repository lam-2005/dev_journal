import { create } from "zustand";
import axios from "../lib/axios";

const useAuthStore = create((set) => ({
  //check auth
  authUser: null,
  isCheckingAuth: true,
  checkAuth: async () => {},

  //signup
  isSigningUp: false,
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axios.post("/api/signup", data);
      set({ authUser: res.data });
    } catch (error) {
      console.error("Error in signup", error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  //login
  isLoggingIn: false,
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axios.post("/api/auth/login", data);
      set({ authUser: res.data });
    } catch (error) {
      console.error("Error in login", error);
    } finally {
      set({ isLoggingIn: false });
    }
  },
}));

export default useAuthStore;
