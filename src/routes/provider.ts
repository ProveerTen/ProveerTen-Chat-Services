import { Router } from "express";
import mongoose from "mongoose";
import { idProvider } from "../controllers/provider-controller";

const router = Router();

router.post('/getproviders', idProvider)

export default router;