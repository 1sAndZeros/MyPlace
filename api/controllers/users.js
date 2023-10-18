const bcrypt = require("bcrypt");
const User = require("../models/user");
const TokenGenerator = require("../lib/tokenGenerator");

const UsersController = {
  Create: async (req, res) => {
    const foundUser = await User.find({ email: req.body.email });
    if (foundUser.length > 0) {
      res
        .status(400)
        .json({ message: "Email exist in the system. Please login" });
    } else {
      const saltRounds = 10;
      bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
          res.status(401).json({ message: "Password encryption error" });
        } else {
          req.body.password = hash;
        }
        const user = new User(req.body);
        user.save().then((savedUser) => {
          if (user !== savedUser) {
            console.log(err);
            res.status(400).json({ message: "Bad request" });
          } else {
            plainUser = savedUser.toJSON();
            delete plainUser.password;
            res.status(201).json({ message: "OK", user: plainUser });
          }
        });
      });
    }
  },

  Index: (req, res) => {
    User.find()
      .populate()
      .exec((err, users) => {
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

  Update: (req, res) => {
    const userId = req.params.id;
    let photo = "";
    if (req.file) {
      photo = req.file.filename;
    }
    User.findByIdAndUpdate(
      userId,
      { photo: photo },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          throw err;
        }
        res
          .status(200)
          .json({ message: "Avatar photo updated!", newUser: updatedUser });
      }
    );
  },
};

module.exports = UsersController;
