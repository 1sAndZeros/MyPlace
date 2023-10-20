const mongoose = require("mongoose");

const RecommendationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  visitedDate: { type: Date, required: true },
  rating: { type: Number },
  location: {
    lat: { type: Number },
    lng: { type: Number },
  },
  comment: { type: String, required: true },
  photos: [{ type: String }],
});

const Recommendation = mongoose.model("Recommendation", RecommendationSchema);

module.exports = Recommendation;
