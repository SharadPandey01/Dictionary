import express from "express";
import protect from "../middleware/protect.js";
import { getDueWords, reviewWord, getStats } from "../controllers/quizController.js";

const router = express.Router();

router.get("/quiz/due", protect, getDueWords);
router.post("/quiz/review/:wordId", protect, reviewWord);
router.get("/quiz/stats", protect, getStats);

export default router;
