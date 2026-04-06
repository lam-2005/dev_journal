import { create } from "zustand";
import axios from "../lib/axios";
import { PostType } from "@/interfaces/post.interface";
import { toast } from "react-toastify";

type BlogStoreType = {
  isCreatingPost: boolean;
  createPost: (data: PostType) => Promise<void>;

  posts: PostType[];
  isGettingAllPosts: boolean;
  getAllPosts: () => Promise<void>;

  postsRecent: PostType[];
  isGettingAllPostsRecent: boolean;
  getAllPostsRecent: () => Promise<void>;

  postBySlug: PostType | null;
  isGettingPostBySlug: boolean;
  getPostBySlug: (slug: string) => Promise<void>;

  postsByUserId: PostType[];
  isGettingAllPostsByUserId: boolean;
  getAllPostsByUserId: (id: string) => Promise<void>;
};

const useBlogStore = create<BlogStoreType>((set) => {
  return {
    isCreatingPost: false,
    createPost: async (data: PostType) => {
      set({ isCreatingPost: true });
      try {
        const res = await axios.post("/api/blog/create", data);
        toast.success("Post created successfully!");
        return res.data;
      } catch (error: any) {
        console.error("Error creating post:", error.response?.data?.message);
        toast.error(
          "The post was not accepted. Please check the title and content and try again.",
        );
        toast.warning(
          error.response?.data?.result?.reason || error.response?.data?.message,
          {
            autoClose: 22000,
          },
        );
        throw error;
      } finally {
        set({ isCreatingPost: false });
      }
    },

    posts: [],
    isGettingAllPosts: false,
    getAllPosts: async () => {
      set({ isGettingAllPosts: true });
      try {
        const res = await axios.get("/api/blog/get-all");

        set({ posts: res.data?.data || [] });
      } catch (error: any) {
        console.error(error?.response?.data?.message || "Error getting posts");
        throw error;
      } finally {
        set({ isGettingAllPosts: false });
      }
    },

    postsRecent: [],
    isGettingAllPostsRecent: false,
    getAllPostsRecent: async () => {
      set({ isGettingAllPostsRecent: true });
      try {
        const res = await axios.get("/api/blog/get-recent");
        console.log(res.data);

        set({ postsRecent: res.data?.data || [] });
      } catch (error: any) {
        console.error(error?.response?.data?.message || "Error getting posts");
        throw error;
      } finally {
        set({ isGettingAllPostsRecent: false });
      }
    },

    postBySlug: null,
    isGettingPostBySlug: false,
    getPostBySlug: async (slug: string) => {
      set({ isGettingPostBySlug: true, postBySlug: null });
      try {
        const res = await axios.get(`/api/blog/post/${slug}`);

        set({ postBySlug: res.data?.data || null });
      } catch (error: any) {
        console.error(error?.response?.data?.message || "Error getting posts");
        set({ postBySlug: null });
        throw error;
      } finally {
        set({ isGettingPostBySlug: false });
      }
    },

    postsByUserId: [],
    isGettingAllPostsByUserId: false,
    getAllPostsByUserId: async (id: string) => {
      set({ isGettingAllPostsByUserId: true });
      try {
        const res = await axios.get(`/api/blog/get/${id}`);

        set({ postsByUserId: res.data?.data || [] });
      } catch (error: any) {
        console.error(error?.response?.data?.message || "Error getting posts");
        throw error;
      } finally {
        set({ isGettingAllPostsByUserId: false });
      }
    },
  };
});
export default useBlogStore;
