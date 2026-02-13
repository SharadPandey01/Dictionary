const Word = require("../models/Word");
const fetchWordFromAPI = async (word) => {
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );

  if (!response.ok) {
    throw new Error("Word not found");
  }

  const data = await response.json();
  return data[0];
};

// GET Meaning
const getMeaning = async (req, res) => {
  const { word } = req.params;

  try {
    const data = await fetchWordFromAPI(word);
    res.json(data);
  } catch (error) {
    res.status(404).json({ message: "Word not found" });
  }
};

// SAVE Word
const saveWord = async (req, res) => {
  const { word, data } = req.body;

  try {
    const existing = await Word.findOne({ word });

    if (existing) {
      return res.status(400).json({ message: "Word already saved" });
    }

    const newWord = await Word.create({
      word,
      data
    });

    res.status(201).json(newWord);

  } catch (error) {
    res.status(500).json({ message: "Error saving word" });
  }
};


// GET All Saved Words
const getSavedWords = async (req, res) => {
  try {
    const words = await Word.find().sort({ createdAt: -1 });
    res.json(words);
  } catch (error) {
    res.status(500).json({ message: "Error fetching saved words" });
  }
};

// DELETE Word
const deleteWord = async (req, res) => {
  try {
    const deleted = await Word.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Word not found" });
    }

    res.json({ message: "Word deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error deleting word" });
  }
};


const wordOfTheDay = async (req, res) => {
  try {
    const words = await Word.find();

    if (words.length === 0) {
      return res.status(404).json({ message: "No saved words yet" });
    }

    const randomIndex = Math.floor(Math.random() * words.length);

    res.json(words[randomIndex].data);

  } catch (error) {
    res.status(500).json({ message: "Error fetching word of the day" });
  }
};

// Random Word (from preset list)
const randomWord = async (req, res) => {
  const randomWords = [
    "serendipity",
    "ephemeral",
    "eloquent",
    "resilient",
    "lucid",
    "reverently",
    "Optimistically",
    "Flabbergasted"
  ];

  const random =
    randomWords[Math.floor(Math.random() * randomWords.length)];

  try {
    const data = await fetchWordFromAPI(random);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching random word" });
  }
};


module.exports = {
  getMeaning,
  saveWord,
  getSavedWords,
  deleteWord,
  wordOfTheDay,
  randomWord
};
