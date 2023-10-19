const City = require("../models/city");
const TokenGenerator = require("../lib/tokenGenerator");

const CitiesController = {
  Create: async (req, res) => {
    console.log(req.user_id);
    const foundCity = await City.find({
      name: req.body.name,
      user: req.user_id,
    });
    if (foundCity.length > 0) {
      res.status(400).json({ message: "This location is already on your map" });
    } else {
      req.body.user = req.user_id;
      console.log(req.body);
      const cityEntry = new City(req.body);
      (await cityEntry.save()).populate("user").then((savedCityEntry) => {
        if (cityEntry !== savedCityEntry) {
          console.log("City not saved correctly");
          res.status(400).json({ message: "Bad request" });
        } else {
          res.status(201).json({ message: "OK", city: savedCityEntry });
        }
      });
    }
  },

  // Index: (req, res) => {
  //   User.find()
  //     .populate()
  //     .exec((err, users) => {
  //       if (err) {
  //         throw err;
  //       }
  //       const token = TokenGenerator.jsonwebtoken(req.user_id); // creates a new refresh token
  //       res.status(200).json({ token, users });
  //     });
  // },

  // IndexUser: (req, res) => {
  //   User.findById(req.user_id).exec((err, foundUser) => {
  //     if (err) {
  //       throw err;
  //     }
  //     const token = TokenGenerator.jsonwebtoken(req.user_id); // creates a new refresh token
  //     res.status(200).json({ token, user: foundUser });
  //   });
  // },
};

module.exports = CitiesController;
