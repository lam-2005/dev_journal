import PostModel from "../models/post.model.js";
import { moderateComment, moderateContent } from "../service/ai.service.js";
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

  getRecentPosts: async (req, res) => {
    try {
      const userId = req.user?.id || null;

      const posts = await PostService.getRecentPosts(userId);
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
      const userId = req.user?.id || null;
      if (!slug) return res.status(400).json({ message: "Slug is required" });

      const post = await PostService.getBySlug(slug, userId);

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
  addComment: async (data) => {
    try {
      const { user_id, blog_id, content } = data;

      if (!content || content.trim() === "") {
        throw new Error("Comment content cannot be empty");
      }

      const post = await PostModel.getById(blog_id);
      if (!post) {
        throw new Error("Post not found to comment");
      }

      const newComment = await PostModel.addComment({
        user_id,
        blog_id,
        content: content.trim(),
      });

      return newComment;
    } catch (error) {
      throw error;
    }
  },
  addComment: async (req, res) => {
    try {
      const { blog_id, content } = req.body;
      const user_id = req.user.id;

      if (!blog_id) {
        return res
          .status(400)
          .json({ success: false, message: "Blog ID is required" });
      }

      try {
        const moderation = await moderateContent("", content);
        if (!moderation.valid) {
          return res.status(400).json({
            success: false,
            message: "Your comment contains inappropriate content.",
            result: moderation,
          });
        }
      } catch (aiError) {
        console.error("AI Moderation Error (Comment):", aiError.message);
      }

      const comment = await PostService.addComment({
        user_id,
        blog_id,
        content,
      });

      return res.status(201).json({
        success: true,
        message: "Comment added successfully",
        data: comment,
      });
    } catch (error) {
      console.error("Error in addComment Controller: ", error);
      const statusCode =
        error.message === "Post not found to comment" ? 404 : 500;
      return res.status(statusCode).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  },
  addComment: async (req, res) => {
    try {
      const { post_id, comment } = req.body;
      const user_id = req.user.id;

      if (!post_id) {
        return res.status(400).json({
          success: false,
          message: "Post ID is required",
        });
      }

      try {
        const moderation = await moderateComment(comment);

        if (!moderation.valid) {
          return res.status(400).json({
            success: false,
            message: "The comment was rejected due to inappropriate content.",
            result: moderation,
          });
        }
      } catch (error) {
        console.error("AI Moderation Error (Comment):", error.message);
      }
      const newComment = await PostService.addComment({
        user_id,
        post_id,
        comment,
      });

      return res.status(201).json({
        success: true,
        message: "Comment posted successfully",
        data: newComment,
      });
    } catch (error) {
      console.error("Error in addComment Controller: ", error);

      const statusCode = error.message === "Target post not found" ? 404 : 500;

      return res.status(statusCode).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  },
  getComments: async (req, res) => {
    try {
      const { id_post } = req.params;

      if (!id_post) {
        return res.status(400).json({
          success: false,
          message: "Post ID is required",
        });
      }

      const comments = await PostService.getCommentsByPostId(id_post);

      return res.status(200).json({
        success: true,
        message: "Comments retrieved successfully",
        data: comments,
      });
    } catch (error) {
      console.error("Error in getComments Controller: ", error);
      const statusCode = error.message === "Target post not found" ? 404 : 500;
      return res.status(statusCode).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  },

  likePost: async (req, res) => {
    try {
      const { post_id } = req.body;
      const user_id = req.user.id;

      if (!post_id)
        return res
          .status(400)
          .json({ success: false, message: "Missing post_id" });

      const data = await PostService.handleLike(user_id, post_id);

      return res.status(200).json({
        success: true,
        data: data,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
  updateViews: async (req, res) => {
    try {
      const { slug } = req.params;
      const result = await PostModel.incrementViews(slug);

      return res.status(200).json({
        success: true,
        views: result.views,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  },
  getTopTrending: async (req, res) => {
    try {
      const post = await PostModel.getTopTrendingPost();
      if (!post) {
        return res
          .status(404)
          .json({ success: false, message: "No posts found" });
      }
      return res.status(200).json({
        success: true,
        data: post,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  },
};

export default PostController;
