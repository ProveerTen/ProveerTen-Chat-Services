import { Router } from "express";
import { createChat, findChat, get_unic_chat, getchats, messages } from "../controllers/chat-controller";

const router = Router();
 
router.post('/create', createChat);
router.post('/find', findChat);
router.post('/getmessages', messages);
router.post('/getchats', getchats);
router.post('/chatunic', get_unic_chat);
export default router;