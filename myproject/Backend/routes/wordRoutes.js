const express = require("express");

const {
  getMeaning,
  saveWord,
  getSavedWords,
  wordOfTheDay,
  randomWord,
  deleteWord
} = require("../controllers/wordController");

const router = express.Router();

router.get("/define/:word", getMeaning);
router.post("/mywords", saveWord);
router.get("/mywords", getSavedWords);
router.delete("/mywords/:id", deleteWord);
router.get("/word-of-the-day", wordOfTheDay);
router.get("/random", randomWord);

module.exports = router;
