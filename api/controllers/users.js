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
      .populate([
        "friends",
        "favouriteLocations"
      ])
      .then(( users) => {
        
        const token = TokenGenerator.jsonwebtoken(req.user_id); // creates a new refresh token
        res.status(200).json({ token, users });
      }).catch((error) => {
        console.log(error)
        res.status(400).json({ message: "Error here" });
      });
  },

  // IndexUser: (req, res) => {
  //   User.findById(req.user_id).exec((err, foundUser) => {
  //     if (err) {
  //       throw err;
  //     }
  //     const token = TokenGenerator.jsonwebtoken(req.user_id); // creates a new refresh token
  //     res.status(200).json({ token, user: foundUser });
  //   });
  // },

  CurrentUser: (req, res) => {
    User.findOne({_id: req.user_id})
    .populate({path: "favouriteLocations", model: "City"})
    .populate("friends")
    .then((user) => {
      if (user) {
        res.status(200).json({user: user})
      } else {
        res.status(400).json({message: 'Can`t find user'})
      }
    })
  },

  Update: (req, res) => {
    User.findByIdAndUpdate(
      req.user_id,
      req.body,
      { new: true })
      .populate({path: "favouriteLocations", model: "City"})
      .populate("friends")
      .then((updatedUser) => {
          const token = TokenGenerator.jsonwebtoken(req.user_id);
          console.log("updated user", updatedUser)
          res.status(200).json({ message: "Avatar photo updated!", token: token, newUser: updatedUser });
      })
      .catch((err) => {
      res.status(400).json({message: "something went wrong"})
      })
  },
};

module.exports = UsersController;
