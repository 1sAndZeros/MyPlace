const User = require("../models/user");
const TokenGenerator = require("../lib/tokenGenerator");

const UsersController = {
  Create: async (req, res) => {
    const user = new User(req.body);
    const foundUser = await User.find({ email: req.body.email });
    if (foundUser.length > 0) {
      res
        .status(400)
        .json({ message: "Email exist in the system. Please login" });
    } else {
      user.save((err) => {
        if (err) {
          console.log(err);
          res.status(400).json({ message: "Bad request" });
        } else {
          res.status(201).json({ message: "OK" });
        }
      });
    }
  },

  Index: (req, res) => {
    User.find().exec((err, users) => {
      if (err) {
        throw err;
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id); // creates a new refresh token
      res.status(200).json({ token, users });
    });
  },

  IndexUser: (req, res) => {
    User.findById(req.user_id).exec((err, foundUser) => {
      if (err) {
        throw err;
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id); // creates a new refresh token
      res.status(200).json({ token, user: foundUser });
    });
  },
};

module.exports = UsersController;
