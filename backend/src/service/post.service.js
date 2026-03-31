import PostModel from "../models/post.model.js";
import { convert } from "url-slug";
import cloudinary from "../lib/cloudinary.js";
const PostService = {
  create: async (data) => {
    if (!data.title) throw new Error("Title is required");
    if (!data.content) throw new Error("Content is required");
    let slug = convert(data.title);
    let content = data.content;

    const base64Regex =
      /<img [^>]*src="data:image\/[^;]+;base64,([^">]+)"[^>]*>/g;
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
};

export default PostService;
