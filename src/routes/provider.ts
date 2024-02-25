import { Router } from "express";
import mongoose from "mongoose";
import { filter_providers_city } from "../controllers/provider-controller";

const router = Router();

router.post('/city', filter_providers_city)

export default router;