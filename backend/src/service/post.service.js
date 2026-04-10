import PostModel from "../models/post.model.js";
import { convert } from "url-slug";
import cloudinary from "../lib/cloudinary.js";
import AuthModel from "../models/auth.model.js";
const PostService = {
  create: async (data) => {
    if (!data.title) throw new Error("Title is required");
    if (!data.content) throw new Error("Content is required");
    let slug = convert(data.title);
    let content = data.content;

    const base64Regex = /src="(data:image\/[^;]+;base64,[^">]+)"/g;
    const matches = [...content.matchAll(base64Regex)];

    if (matches.length > 0) {
      const uploadPromises = matches.map((match) =>
        cloudinary.uploader.upload(match[1], { folder: "blog_content" }),
      );

      const uploadResults = await Promise.all(uploadPromises);
      matches.forEach((match, index) => {
        content = content.replace(match[1], uploadResults[index].secure_url);
      });
    }

    let imageUrl = data.image;
    if (data.image && data.image.startsWith("data:image")) {
      const uploadRes = await cloudinary.uploader.upload(data.image, {
        folder: "blog_thumbnails",
      });
      imageUrl = uploadRes.secure_url;
    } else if (!imageUrl) {
      const imgRegex = /<img[^>]+src="([^">]+)"/i;
      const firstImgMatch = content.match(imgRegex);
      if (firstImgMatch) {
        imageUrl = firstImgMatch[1];
      }
    }

    const checkSlug = await PostModel.findBySlug(slug);
    if (checkSlug) slug = `${slug}-${Math.floor(Math.random() * 10000)}`;

    const autoExcerpt =
      data.content
        .replace(/<[^>]*>/g, "")
        .substring(0, 150)
        .trim() + "...";

    try {
      const newPost = await PostModel.create({
        ...data,
        slug,
        excerpt: data.excerpt || autoExcerpt,
        image: imageUrl,
        content,
      });
      return newPost;
    } catch (error) {
      throw error;
    }
  },

  getAll: async () => {
    try {
      const posts = await PostModel.getAll();
      return posts;
    } catch (error) {
      throw error;
    }
  },

  getRecentPosts: async (userId) => {
    try {
      return await PostModel.getRecentPosts(userId);
    } catch (error) {
      throw error;
    }
  },

  getAllByUserId: async (user_id) => {
    try {
      const userIsExist = await AuthModel.findById(user_id);
      if (!userIsExist) throw new Error("User not found");
      const posts = await PostModel.getAllByUserId(user_id);
      return posts;
    } catch (error) {
      throw error;
    }
  },
  delete: async (id) => {
    try {
      if (!id) throw new Error("Id Post is required");

      const deletedPost = await PostModel.delete(id);
      return deletedPost;
    } catch (error) {
      throw error;
    }
  },
  update: async (id, data, user_id) => {
    const existingPost = await PostModel.getById(id);
    if (!existingPost) throw new Error("Post not found");
    if (existingPost.user_id !== user_id)
      throw new Error("You are not authorized to edit this post!");

    if (!data.title) throw new Error("Title is required");
    if (!data.content) throw new Error("Content is required");

    let content = data.content;
    let slug = existingPost.slug;

    if (data.title !== existingPost.title) {
      slug = convert(data.title);
      const checkSlug = await PostModel.findBySlug(slug);

      if (checkSlug && checkSlug.id !== id) {
        slug = `${slug}-${Math.floor(Math.random() * 10000)}`;
      }
    }

    const base64Regex = /src="(data:image\/[^;]+;base64,[^">]+)"/g;
    const matches = [...content.matchAll(base64Regex)];

    if (matches.length > 0) {
      const uploadPromises = matches.map((match) =>
        cloudinary.uploader.upload(match[1], { folder: "blog_content" }),
      );
      const uploadResults = await Promise.all(uploadPromises);
      matches.forEach((match, index) => {
        content = content.replace(match[1], uploadResults[index].secure_url);
      });
    }

    let imageUrl = data.image || existingPost.image;
    if (data.image && data.image.startsWith("data:image")) {
      const uploadRes = await cloudinary.uploader.upload(data.image, {
        folder: "blog_thumbnails",
      });
      imageUrl = uploadRes.secure_url;
    }

    const autoExcerpt =
      content
        .replace(/<[^>]*>/g, "")
        .substring(0, 150)
        .trim() + "...";

    try {
      const updatedPost = await PostModel.update(id, {
        ...data,
        slug,
        excerpt: data.excerpt || autoExcerpt,
        image: imageUrl,
        content,
      });

      return updatedPost;
    } catch (error) {
      throw error;
    }
  },
  getBySlug: async (slug, userId) => {
    try {
      const post = await PostModel.findBySlug(slug, userId);
      if (!post) {
        throw new Error("Post not found");
      }
      return post;
    } catch (error) {
      throw error;
    }
  },
  getById: async (id) => {
    try {
      const post = await PostModel.getById(id);
      if (!post) {
        throw new Error("Post not found");
      }
      return post;
    } catch (error) {
      throw error;
    }
  },
  addComment: async (data) => {
    try {
      const { user_id, post_id, comment } = data;

      if (!comment || comment.trim() === "") {
        throw new Error("Comment content is required");
      }

      // Check if post exists
      const post = await PostModel.getById(post_id);
      if (!post) {
        throw new Error("Target post not found");
      }

      const newComment = await PostModel.addComment({
        user_id,
        post_id,
        comment: comment.trim(),
      });

      return newComment;
    } catch (error) {
      throw error;
    }
  },
  getCommentsByPostId: async (post_id) => {
    try {
      // Kiểm tra bài viết tồn tại
      const post = await PostModel.getById(post_id);
      if (!post) throw new Error("Target post not found");

      const comments = await PostModel.getCommentsByPostId(post_id);
      return comments;
    } catch (error) {
      throw error;
    }
  },

  handleLike: async (user_id, post_id) => {
    // 1. Thực hiện toggle trong DB
    const result = await PostModel.toggleLike(user_id, post_id);

    // 2. Lấy số lượng like mới nhất để cập nhật UI ngay lập tức
    const likeCount = await PostModel.getLikeCount(post_id);

    return {
      liked: result.liked,
      likeCount: likeCount,
    };
  },
};

export default PostService;
