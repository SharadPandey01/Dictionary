import express from "express";
import protect from "../middleware/protect.js";
import {
  getCollections,
  createCollection,
  deleteCollection,
  addWordToCollection,
  removeWordFromCollection,
  getCollectionWords
} from "../controllers/collectionController.js";

const router = express.Router();

router.get("/", protect, getCollections);
router.post("/", protect, createCollection);
router.delete("/:id", protect, deleteCollection);
router.get("/:id/words", protect, getCollectionWords);
router.post("/:id/words/:wordId", protect, addWordToCollection);
router.delete("/:id/words/:wordId", protect, removeWordFromCollection);

export default router;
