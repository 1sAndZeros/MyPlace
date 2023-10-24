const City = require("../models/city");
const TokenGenerator = require("../lib/tokenGenerator");

const CitiesController = {
  Create: async (req, res) => {
    const foundCity = await City.find({
      name: req.body.name,
      user: req.user_id,
    });
    if (foundCity.length > 0) {
      res.status(400).json({ message: "This location is already on your map" });
    } else {
      req.body.user = req.user_id;
      const cityEntry = new City(req.body);
      (await cityEntry.save())
        .populate({
          path: "user",
          model: "User",
          select: "-password",
        })
        .then((savedCityEntry) => {
          if (cityEntry !== savedCityEntry) {
            console.log("City not saved correctly");
            res.status(400).json({ message: "Bad request" });
          } else {
            res.status(201).json({ message: "OK", city: savedCityEntry });
          }
        });
    }
  },

  Index: async (req, res) => {
    City.find()
      .populate({
        path: "user",
        model: "User",
        select: "-password",
      })
      .then((cities) => {
        const token = TokenGenerator.jsonwebtoken(req.user_id); // creates a new refresh token
        res.status(200).json({ token, cities });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({ message: "Error here" });
      });
  },

  IndexMyCities: async (req, res) => {
    City.find({ user: req.user_id })
      .populate({
        path: "user",
        model: "User",
        select: "-password",
      })
      .then((cities) => {
        const token = TokenGenerator.jsonwebtoken(req.user_id); // creates a new refresh token
        res.status(200).json({ token, cities });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({
          message: "Something went wrong. Please contact the MyPlace Team.",
        });
      });
  },

  IndexUserCities: async (req, res) => {
    City.find({ user: req.params.id })
      .populate({
        path: "user",
        model: "User",
        select: "-password",
      })
      .then((cities) => {
        const token = TokenGenerator.jsonwebtoken(req.user_id); // creates a new refresh token
        res.status(200).json({ token, cities });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({
          message: "Something went wrong. Please contact the MyPlace Team.",
        });
      });
  },

  Update: (req, res) => {
    console.log("body", req.body);
    City.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate({
        path: "user",
        model: "User",
        select: "-password",
      })
      .then((updatedCity) => {
        const token = TokenGenerator.jsonwebtoken(req.user_id);
        res.status(200).json({
          message: "City entry has been updated!",
          token: token,
          city: updatedCity,
        });
      })
      .catch((err) => {
        res.status(400).json({ message: "Error updating city entry" });
      });
  },

  Delete: async (req, res) => {
    const cityId = req.params.id;
    await City.findByIdAndDelete(cityId);
    const token = TokenGenerator.jsonwebtoken(req.user_id);
    res.status(200).json({ message: "OK", token: token });
  }
};

module.exports = CitiesController;
