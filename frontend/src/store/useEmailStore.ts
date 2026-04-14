import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-toastify";

export type EmailContactType = {
  name: string;
  email: string;
  message: string;
};
type EmailStoreType = {
  isSenđingEmailContact: boolean;
  sendEmailContact: (data: EmailContactType) => Promise<void>;
};

const useEmailStore = create<EmailStoreType>((set) => ({
  isSenđingEmailContact: false,
  sendEmailContact: async (data: EmailContactType) => {
    set({ isSenđingEmailContact: true });
    try {
      const res = await axios.post("/api/email/contact", data);
      toast.success(res.data?.message);
      return res.data;
    } catch (error: any) {
      toast.error(error.response?.data?.error || error.response?.data?.message);
      console.error("Error in sendEmailContact: ", error.response?.data?.error);
      throw error;
    } finally {
      set({ isSenđingEmailContact: false });
    }
  },
}));

export default useEmailStore;
