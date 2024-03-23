import { Router } from "express";
import { gemini_chat } from "../controllers/chat-bot-controller";

const router = Router();

router.post('/gemini', gemini_chat);

export default router;