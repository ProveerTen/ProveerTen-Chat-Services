import { Router } from "express";
import { createChat, findChat, getchats, messages } from "../controllers/chat-controller";

const router = Router();
 
router.post('/create', createChat);
router.post('/find', findChat);
router.post('/getmessages', messages);
router.post('/getchats', getchats);
export default router;