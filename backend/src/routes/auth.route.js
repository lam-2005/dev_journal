import { Router } from "express";
import AuthController from "../controllers/auth.comtroller.js";
import protectedRoute from "../middlewares/auth.middleware.js";
const router = Router();

router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.get("/check", protectedRoute, (req, res) => {
  res.status(200).json(req.user);
});
router.get("/:user_id", AuthController.getById);
export default router;
