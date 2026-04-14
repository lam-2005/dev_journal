import { create } from "zustand";
import axios from "../lib/axios";
import { CommentType, PostType } from "@/interfaces/post.interface";
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

  postById: PostType | null;
  isGettingPostById: boolean;
  getPostById: (id: string) => Promise<void>;

  postsByUserId: PostType[];
  isGettingAllPostsByUserId: boolean;
  getAllPostsByUserId: (id: string) => Promise<void>;

  isDeletingPost: boolean;
  deletePost: (id: string) => Promise<void>;

  isUpdatingPost: boolean;
  updatePost: ({ id, data }: { id: string; data: PostType }) => Promise<void>;

  isCommenting: boolean;
  addComment: (data: { post_id: string; comment: string }) => Promise<void>;

  comments: CommentType[];
  isGettingComments: boolean;
  getComments: (postId: string) => Promise<void>;

  isLiking: boolean;
  likePost: (postId: string) => Promise<void>;

  lastViewedId: string | null;
  incrementPostView: (slug: string) => Promise<void>;

  topPost: PostType | null;
  getTopPost: () => Promise<void>;
};

const useBlogStore = create<BlogStoreType>((set, get) => {
  return {
    isCreatingPost: false,
    createPost: async (data: PostType) => {
      set({ isCreatingPost: true });
      try {
        const res = await axios.post("/api/blog/create", data);
        toast.success("Post created successfully!");
        return res.data;
      } catch (error: any) {
        console.error("Error creating post:", error.response?.data?.error);
        toast.error(
          "The post was not accepted. Please check the title and content and try again.",
        );
        toast.warning(
          error.response?.data?.result?.reason || error.response?.data?.error,
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
        console.error(error?.response?.data?.error || "Error getting posts");
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
        console.error(error?.response?.data?.error || "Error getting posts");
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
        console.error(error?.response?.data?.error || "Error getting posts");
        set({ postBySlug: null });
        throw error;
      } finally {
        set({ isGettingPostBySlug: false });
      }
    },

    postById: null,
    isGettingPostById: false,
    getPostById: async (id: string) => {
      set({ isGettingPostById: true, postById: null });
      try {
        const res = await axios.get(`/api/blog/post/id/${id}`);

        set({ postById: res.data?.data || null });
      } catch (error: any) {
        console.error(error?.response?.data?.error || "Error getting posts");
        set({ postById: null });
        throw error;
      } finally {
        set({ isGettingPostById: false });
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
        console.error(error?.response?.data?.error || "Error getting posts");
        throw error;
      } finally {
        set({ isGettingAllPostsByUserId: false });
      }
    },

    isDeletingPost: false,
    deletePost: async (id: string) => {
      set({ isDeletingPost: true });
      try {
        const res = await axios.delete(`/api/blog/delete/${id}`);
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== id),
          postsRecent: state.postsRecent.filter((post) => post.id !== id),
          postsByUserId: state.postsByUserId.filter((post) => post.id !== id),
          postBySlug: state.postBySlug?.id === id ? null : state.postBySlug,
        }));

        toast.success("Post deleted successfully!");
        return res.data;
      } catch (error: any) {
        console.error(error?.response?.data?.error || "Error getting posts");
        throw error;
      } finally {
        set({ isDeletingPost: false });
      }
    },

    isUpdatingPost: false,
    updatePost: async ({ id, data }: { id: string; data: PostType }) => {
      set({ isUpdatingPost: true });
      try {
        const res = await axios.put(`/api/blog/update/${id}`, data);
        toast.success("Post updated successfully!");
        return res.data;
      } catch (error: any) {
        console.error("Error updating post:", error.response?.data?.error);
        toast.error(
          "The post was not accepted. Please check the title and content and try again.",
        );
        toast.warning(
          error.response?.data?.result?.reason || error.response?.data?.error,
          {
            autoClose: 22000,
          },
        );
        throw error;
      } finally {
        set({ isUpdatingPost: false });
      }
    },
    isCommenting: false,
    addComment: async (data) => {
      set({ isCommenting: true });
      try {
        const res = await axios.post("/api/blog/comment", data);

        const newCmt = res.data.data;

        set((state) => ({
          comments: [newCmt, ...state.comments],
        }));
        toast.success("Comment posted successfully!");
      } catch (error: any) {
        console.error("Error commenting:", error.response?.data?.error);
        toast.error(
          error.response?.data?.result?.reason ||
            error.response?.data?.message ||
            "Failed to post comment",
        );
        throw error;
      } finally {
        set({ isCommenting: false });
      }
    },
    comments: [],
    isGettingComments: false,
    getComments: async (postId: string) => {
      set({ isGettingComments: true });
      try {
        const res = await axios.get(`/api/blog/post/comments/${postId}`);
        set({ comments: res.data?.data || [] });
      } catch (error: any) {
        console.error("Error fetching comments:", error);
        set({ comments: [] });
      } finally {
        set({ isGettingComments: false });
      }
    },

    isLiking: false,

    likePost: async (postId: string) => {
      set({ isLiking: true });
      try {
        const res = await axios.post("/api/blog/like", { post_id: postId });
        const { liked, likeCount } = res.data.data;

        set((state) => ({
          postsRecent: state.postsRecent.map((p) =>
            p.id === postId
              ? { ...p, like_count: likeCount, is_liked: liked }
              : p,
          ),
          postBySlug:
            state.postBySlug?.id === postId
              ? { ...state.postBySlug, like_count: likeCount, is_liked: liked }
              : state.postBySlug,

          postsByUserId: state.postsByUserId.map((p) =>
            p.id === postId
              ? { ...p, like_count: likeCount, is_liked: liked }
              : p,
          ),
        }));

        if (liked) return;
      } catch (error: any) {
        toast.error(error.response?.data?.error || "Login to like this post");
      } finally {
        set({ isLiking: false });
      }
    },

    lastViewedId: null,
    incrementPostView: async (slug: string) => {
      if (get().lastViewedId === slug) return;
      try {
        set({ lastViewedId: slug });
        await axios.patch(`/api/blog/${slug}/views`);
        setTimeout(() => set({ lastViewedId: null }), 2000);
      } catch (error) {
        set({ lastViewedId: null });
        console.error("Failed to increment view", error);
      }
    },

    topPost: null,
    getTopPost: async () => {
      try {
        const res = await axios.get("/api/blog/top-trending");
        set({ topPost: res.data?.data });
      } catch (error) {
        console.error("Error fetching top post:", error);
      }
    },
  };
});
export default useBlogStore;
