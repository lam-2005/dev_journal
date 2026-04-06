import { moderateContent } from "../service/ai.service.js";
import PostService from "../service/post.service.js";

const PostController = {
  create: async (req, res) => {
    try {
      const data = req.body;
      const user_id = req.user.id;
      if (!user_id) throw new Error("User ID is required");
      data.user_id = user_id;
      let moderation = { valid: true };
      try {
        moderation = await moderateContent(data.title, data.content);
      } catch (error) {
        return res.status(503).json({
          message:
            "Sorry! Cannot moderate content at the moment, please try again later",
        });
      }
      if (!moderation.valid) {
        console.log(moderation);
        return res.status(400).json({
          message: "Bài viết không được chấp nhận",
          result: moderation,
        });
      }

      const newPost = await PostService.create({ ...data, user_id });
      return res.status(201).json({
        success: true,
        message: "Post created successfully",
        data: newPost,
      });
    } catch (error) {
      console.error("Error in PostController: ", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  getAll: async (_, res) => {
    try {
      const posts = await PostService.getAll();
      return res.status(200).json({
        success: true,
        message: "Posts retrieved successfully",
        data: posts,
      });
    } catch (error) {
      console.error("Error in PostController: ", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  getRecentPosts: async (_, res) => {
    try {
      const posts = await PostService.getRecentPosts();
      return res.status(200).json({
        success: true,
        message: "Posts retrieved successfully",
        data: posts,
      });
    } catch (error) {
      console.error("Error in PostController: ", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  getAllByUserId: async (req, res) => {
    try {
      const user_id = req.params.user_id;
      if (!user_id) res.status(400).json({ message: "User ID is required" });
      const posts = await PostService.getAllByUserId(user_id);
      return res.status(200).json({
        success: true,
        message: "Posts retrieved successfully",
        data: posts,
      });
    } catch (error) {
      console.error("Error in PostController: ", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  getBySlug: async (req, res) => {
    try {
      const slug = req.params.slug;
      if (!slug) res.status(400).json({ message: "Slug is required" });
      const post = await PostService.getBySlug(slug);
      console.log(post);

      return res.status(200).json({
        success: true,
        message: "Get post successfully",
        data: post,
      });
    } catch (error) {
      console.error("Error in PostController: ", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
};

export default PostController;
