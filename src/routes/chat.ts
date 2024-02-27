import { Router } from "express";
import { createChat, findChat, messages } from "../controllers/chat-controller";

const router = Router();
 
router.post('/create', createChat);
router.post('/find', findChat);
router.post('/getmessages', messages);
export default router;