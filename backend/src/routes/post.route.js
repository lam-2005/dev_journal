import { Router } from "express";
import PostController from "../controllers/post.controller.js";
import protectedRoute from "../middlewares/auth.middleware.js";
const router = Router();

router.post("/create", protectedRoute, PostController.create);
// router.post("/login", AuthController.login);
// router.post("/logout", AuthController.logout);
// router.get("/check", protectedRoute, (req, res) => {
//   res.status(200).json(req.user);
// });
export default router;
