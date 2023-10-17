const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profileImage: { type: String },
  locations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City"
    }
  ],
  favouriteLocations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City"
    }
  ],
  recommendations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recommendation"
    }
  ] 
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
