const mongoose = require("mongoose");

const CitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recommendations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recommendation",
    },
  ],
  memory: { type: String },
  photos: [
    String
  ],
  location: {
    lng: { type: Number, required: true },
    lat: { type: Number, required: true },
  },
  visited: { type: Boolean, required: true },
  visitedDate: { type: Date },
  rating: { type: Number },
  favourite: { type: Boolean }
});

const City = mongoose.model("City", CitySchema);

module.exports = City;
