import PostService from "../service/post.service.js";

const PostController = {
  create: async (req, res) => {
    try {
      const data = req.body;
      const user_id = req.user.id;
      if (!user_id) throw new Error("User ID is required");
      data.user_id = user_id;
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
