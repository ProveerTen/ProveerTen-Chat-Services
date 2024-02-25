import { Router } from "express";
import { createChat, findChat } from "../controllers/chat-controller";

const router = Router();
 
router.post('/create', createChat);
router.post('/find', findChat);
export default router;