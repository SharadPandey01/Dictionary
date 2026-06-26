import express from "express";
import protect from "../middleware/protect.js";
import {
  getMeaning,
  saveWord,
  getSavedWords,
  wordOfTheDay,
  deleteWord
} from "../controllers/wordController.js";

import { dictionaryLimiter } from "../middleware/rateLimiters.js";

const router = express.Router();

router.get("/define/:word", dictionaryLimiter, getMeaning);
router.post("/mywords", protect, saveWord);
router.get("/mywords", protect, getSavedWords);
router.delete("/mywords/:id", protect, deleteWord);
router.get("/word-of-the-day", wordOfTheDay);

export default router;
