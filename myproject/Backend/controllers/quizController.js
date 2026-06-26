import Word from "../models/Word.js";

const getDueWords = async (req, res, next) => {
  try {
    const now = new Date();
    const words = await Word.find({
      userId: req.user.id,
      nextReviewDate: { $lte: now }
    }).limit(20);
    res.json(words);
  } catch (error) {
    next(error);
  }
};

const reviewWord = async (req, res, next) => {
  const { wordId } = req.params;
  const { score } = req.body;

  if (score === undefined || score < 0 || score > 5) {
    return res.status(400).json({ error: "Score must be between 0 and 5" });
  }

  try {
    const word = await Word.findOne({ _id: wordId, userId: req.user.id });

    if (!word) {
      return res.status(404).json({ error: "Word not found" });
    }

    let { easeFactor, interval, repetitions } = word;

    if (score < 3) {
      repetitions = 0;
      interval = 1;
    } else {
      if (repetitions === 0) {
        interval = 1;
      } else if (repetitions === 1) {
        interval = 6;
      } else {
        interval = Math.round(interval * easeFactor);
      }
      repetitions += 1;
    }

    easeFactor = easeFactor + (0.1 - (5 - score) * (0.08 + (5 - score) * 0.02));
    if (easeFactor < 1.3) easeFactor = 1.3;

    const now = new Date();
    const nextReviewDate = new Date(now.getTime() + interval * 24 * 60 * 60 * 1000);

    const reviewHistory = [...word.reviewHistory, { date: now, score }].slice(-10);

    word.easeFactor = easeFactor;
    word.interval = interval;
    word.repetitions = repetitions;
    word.nextReviewDate = nextReviewDate;
    word.lastReviewedAt = now;
    word.reviewHistory = reviewHistory;

    await word.save();

    res.json(word);
  } catch (error) {
    next(error);
  }
};

const getStats = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);

    const totalWords = await Word.countDocuments({ userId });

    const dueToday = await Word.countDocuments({
      userId,
      nextReviewDate: { $lte: now }
    });

    const reviewedToday = await Word.countDocuments({
      userId,
      lastReviewedAt: { $gte: startOfDay, $lt: endOfDay }
    });

    res.json({ dueToday, reviewedToday, totalWords });
  } catch (error) {
    next(error);
  }
};

export { getDueWords, reviewWord, getStats };
