const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  profileImage: { type: String },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
