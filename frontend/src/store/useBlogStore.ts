import { create } from "zustand";
import axios from "../lib/axios";

type PostType = {
  title: string;
  content: string;
  image?: string | null;
  excerpt?: string;
};

type BlogStoreType = {
  isCreatingPost: boolean;
  createPost: (data: PostType) => Promise<void>;
};

const useBlogStore = create<BlogStoreType>((set) => {
  return {
    isCreatingPost: false,
    createPost: async (data: PostType) => {
      set({ isCreatingPost: true });
      try {
        const res = await axios.post("/api/blog/create", data);
        return res.data;
      } catch (error) {
        throw error;
      } finally {
        set({ isCreatingPost: false });
      }
    },
  };
});
export default useBlogStore;
