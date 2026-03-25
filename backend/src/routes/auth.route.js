import { Router } from "express";
import AuthController from "../controllers/auth.comtroller.js";
const router = Router();

router.post("/signup", AuthController.signup);

export default router;
