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

export default router;
