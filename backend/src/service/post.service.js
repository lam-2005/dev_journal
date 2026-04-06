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

  getRecentPosts: async () => {
    try {
      const posts = await PostModel.getRecentPosts();
      return posts;
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
  update: async (id, data) => {
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
  getBySlug: async (slug) => {
    try {
      const post = await PostModel.findBySlug(slug);
      if (!post) {
        throw new Error("Post not found");
      }
      return post;
    } catch (error) {
      throw error;
    }
  },
};

export default PostService;
