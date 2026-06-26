import Collection from "../models/Collection.js";
import Word from "../models/Word.js";

const getCollections = async (req, res, next) => {
  try {
    const collections = await Collection.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(collections);
  } catch (error) {
    error.status = 500;
    error.message = "Error fetching collections";
    next(error);
  }
};

const createCollection = async (req, res, next) => {
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Collection name is required" });
  }

  try {
    const collection = await Collection.create({ name: name.trim(), userId: req.user.id });
    res.status(201).json(collection);
  } catch (error) {
    error.status = 500;
    error.message = "Error creating collection";
    next(error);
  }
};

const deleteCollection = async (req, res, next) => {
  try {
    const collection = await Collection.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    await Word.updateMany(
      { collectionId: req.params.id, userId: req.user.id },
      { collectionId: null }
    );

    res.json({ message: "Collection deleted" });
  } catch (error) {
    error.status = 500;
    error.message = "Error deleting collection";
    next(error);
  }
};

const addWordToCollection = async (req, res, next) => {
  try {
    const collection = await Collection.findOne({ _id: req.params.id, userId: req.user.id });

    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    const word = await Word.findOneAndUpdate(
      { _id: req.params.wordId, userId: req.user.id },
      { collectionId: req.params.id },
      { new: true }
    );

    if (!word) {
      return res.status(404).json({ error: "Word not found" });
    }

    res.json(word);
  } catch (error) {
    error.status = 500;
    error.message = "Error assigning word to collection";
    next(error);
  }
};

const removeWordFromCollection = async (req, res, next) => {
  try {
    const word = await Word.findOneAndUpdate(
      { _id: req.params.wordId, userId: req.user.id, collectionId: req.params.id },
      { collectionId: null },
      { new: true }
    );

    if (!word) {
      return res.status(404).json({ error: "Word not found in collection" });
    }

    res.json(word);
  } catch (error) {
    error.status = 500;
    error.message = "Error removing word from collection";
    next(error);
  }
};

const getCollectionWords = async (req, res, next) => {
  try {
    const collection = await Collection.findOne({ _id: req.params.id, userId: req.user.id });

    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    const words = await Word.find({ collectionId: req.params.id, userId: req.user.id }).sort({ createdAt: -1 });
    res.json(words);
  } catch (error) {
    error.status = 500;
    error.message = "Error fetching collection words";
    next(error);
  }
};

export { getCollections, createCollection, deleteCollection, addWordToCollection, removeWordFromCollection, getCollectionWords };
