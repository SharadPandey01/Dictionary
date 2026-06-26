import mongoose from "mongoose";
import Word from "../models/Word.js";

const fetchWordFromAPI = async (word) => {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        const err = new Error("Word not found");
        err.status = 404;
        throw err;
      }
      const err = new Error("Dictionary service is currently unavailable.");
      err.status = 503;
      throw err;
    }

    const data = await response.json();
    return data[0];
  } catch (error) {
    if (!error.status) {
      error.status = 503;
      error.message = "Dictionary service is currently unavailable.";
    }
    throw error;
  }
};

const getMeaning = async (req, res, next) => {
  const { word } = req.params;

  try {
    const data = await fetchWordFromAPI(word);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const saveWord = async (req, res, next) => {
  const { word, data } = req.body;
  const userId = req.user.id;

  try {
    const existing = await Word.findOne({ word, userId });

    if (existing) {
      return res.status(400).json({ error: "Word already saved" });
    }

    const newWord = await Word.create({ word, data, userId });

    res.status(201).json(newWord);
  } catch (error) {
    console.error("Error in saveWord:", error);
    next(error);
  }
};

const getSavedWords = async (req, res, next) => {
  try {
    const words = await Word.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(words);
  } catch (error) {
    error.status = 500;
    error.message = "Error fetching saved words";
    next(error);
  }
};

const deleteWord = async (req, res, next) => {
  try {
    const deleted = await Word.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!deleted) {
      return res.status(404).json({ error: "Word not found" });
    }

    res.json({ message: "Word deleted successfully" });
  } catch (error) {
    error.status = 500;
    error.message = "Error deleting word";
    next(error);
  }
};

const dailyWords = [
  "serendipity", "ephemeral", "luminescent", "eloquent", "resilient", "enigma", "paradigm",
  "melancholy", "nostalgia", "quintessential", "ubiquitous", "ineffable", "evanescent", "mellifluous",
  "sonorous", "halcyon", "labyrinth", "epiphany", "clandestine", "ethereal", "surreptitious",
  "obfuscate", "solitude", "magnanimous", "effervescent", "cacophony", "serene", "panacea",
  "pragmatic", "vicarious", "petrichor"
];

const wordOfTheDay = async (req, res, next) => {
  try {
    const dayOfMonth = new Date().getDate(); // 1 to 31
    const targetWord = dailyWords[(dayOfMonth - 1) % dailyWords.length];
    
    const data = await fetchWordFromAPI(targetWord);
    res.json(data);
  } catch (error) {
    error.status = 500;
    error.message = "Error fetching word of the day";
    next(error);
  }
};

export { getMeaning, saveWord, getSavedWords, deleteWord, wordOfTheDay };
