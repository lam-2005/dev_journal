import { moderateContent } from "../service/ai.service.js";
import PostService from "../service/post.service.js";

const PostController = {
  create: async (req, res) => {
    try {
      const data = req.body;
      const user_id = req.user.id;
      if (!user_id)
        return res.status(400).json({ message: "User ID is required" });
      data.user_id = user_id;
      let moderation = { valid: true };
      try {
        moderation = await moderateContent(data.title, data.content);
      } catch (error) {
        console.error(
          "AI Moderation Error Details:",
          error.response?.data || error.message,
        );
        return res.status(503).json({
          message:
            "Sorry! Cannot moderate content at the moment, please try again later",
          error,
        });
      }
      if (!moderation.valid) {
        console.log(moderation);
        return res.status(400).json({
          message: "The post was not accepted.",
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
      if (!user_id)
        return res.status(400).json({ message: "User ID is required" });
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
      if (!slug) return res.status(400).json({ message: "Slug is required" });
      const post = await PostService.getBySlug(slug);

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
  getById: async (req, res) => {
    try {
      const id_post = req.params.id_post;
      if (!id_post)
        return res.status(400).json({ message: "Id post is required" });
      const post = await PostService.getById(id_post);

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

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const postDeleted = await PostService.delete(id);
      return res.status(200).json({
        success: true,
        message: "Delete post successfully",
        data: postDeleted,
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
  update: async (req, res) => {
    try {
      const data = req.body;
      const id_post = req.params.id_post;

      const user_id = req.user.id;

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
          message: "The post was not accepted.",
          result: moderation,
        });
      }

      const updatedPost = await PostService.update(id_post, data, user_id);
      return res.status(200).json({
        success: true,
        message: "Post updated successfully",
        data: updatedPost,
      });
    } catch (error) {
      console.error("Error in PostController: ", error);
      if (error.message === "You are not authorized to edit this post!") {
        return res.status(403).json({ success: false, message: error.message });
      }
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
};

export default PostController;
