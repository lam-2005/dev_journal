import { Router } from "express";
import PostController from "../controllers/post.controller.js";
import protectedRoute from "../middlewares/auth.middleware.js";
const router = Router();

router.post("/create", protectedRoute, PostController.create);
router.get("/get-all", PostController.getAll);
router.get("/get-recent", PostController.getRecentPosts);
router.get("/get", (_, res) =>
  res.status(400).json({ message: "Vui lòng cung cấp User ID" }),
);
router.get("/get/:user_id", PostController.getAllByUserId);
router.get("/post/:slug", PostController.getBySlug);
router.get("/post/id/:id_post", PostController.getById);

router.delete("/delete/:id", protectedRoute, PostController.delete);
router.put("/update/:id_post", protectedRoute, PostController.update);

router.post("/comment", protectedRoute, PostController.addComment);
router.get("/post/comments/:id_post", PostController.getComments);
export default router;
