import express from "express";
import { analyzeFile } from "../controllers/aiController.js";

const router = express.Router();
router.post("/analyze", analyzeFile);

export default router;
