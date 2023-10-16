const express = require("express");
const router = express.Router();
const tokenChecker = require("../lib/tokenChecker");
const UsersController = require("../controllers/users");

router.post("/", UsersController.Create); // Creates new user
router.get("/", tokenChecker, UsersController.Index); // Gets all users
router.get("/me", tokenChecker, UsersController.IndexUser); // Gets logged in user

module.exports = router;
