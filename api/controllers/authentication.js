const bcrypt = require("bcrypt");
const User = require("../models/user");
const TokenGenerator = require("../lib/tokenGenerator");

const AuthenticationController = {
  Authenticate: (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }).then((user) => {
      if (!user) {
        console.log("auth error: user not found");
        res.status(401).json({
          message:
            "User email does not exist. Please sign up or use the correct email",
        });
      } else {
        if (password === user.password) {
          const token = TokenGenerator.jsonwebtoken(user.id);
          res.status(201).json({ token: token, message: "OK" });
        } else {
          res.status(402).json({ message: "Incorrect password" });
        }
        // bcrypt.compare(password, user.password, async (err, result) => {
        //   console.log(password)
        //   console.log(user.password)
        // if (err) {
        //   res.status(401).json({ message: "Password encryption error" });
        // } else if (result === false) {
        //   console.log(res)
        //   res.status(402).json({ message: "Incorrect password" });
        // } else {
        //   const token = await TokenGenerator.jsonwebtoken(user.id);
        //   res.status(201).json({ token: token, message: "OK" });
        // }
      }
      //   }
      // });
    });
  },
};
module.exports = AuthenticationController;
