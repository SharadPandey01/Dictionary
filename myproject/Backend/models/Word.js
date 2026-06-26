import mongoose from "mongoose";

const wordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true
  },
  data: {
    type: Object,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  collectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Collection",
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  easeFactor: {
    type: Number,
    default: 2.5
  },
  interval: {
    type: Number,
    default: 1
  },
  repetitions: {
    type: Number,
    default: 0
  },
  nextReviewDate: {
    type: Date,
    default: Date.now
  },
  lastReviewedAt: {
    type: Date,
    default: null
  },
  reviewHistory: {
    type: [{ date: Date, score: Number }],
    default: []
  }
});

wordSchema.index({ userId: 1, word: 1 }, { unique: true });

export default mongoose.model("Word", wordSchema);
