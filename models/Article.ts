import * as mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
  previewImage: {
    type: String,
    required: true,
  },
  optionnelImage: {
    type: [String],
    default: [],
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  availableStock: {
    type: Number,
    default: 1,
  },

  status: {
    type: String,
    enum: ["AVAILABLE", "OUT_OF_STOCK"],
    default: "AVAILABLE",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  deletedAt: {
    type: Date,
    default: null,
  },
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
