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
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};

export default PostController;
