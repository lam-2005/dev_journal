import { Router } from "express";
import EmailController from "../controllers/email.controller.js";
const router = Router();

router.post("/contact", EmailController.submitContact);

export default router;
