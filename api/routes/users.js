const express = require("express");
const router = express.Router();
const tokenChecker = require("../lib/tokenChecker");
const UsersController = require("../controllers/users");

router.post("/", UsersController.Create); // Creates new user
router.get("/", tokenChecker, UsersController.Index); // Gets all users
router.get("/me", tokenChecker, UsersController.CurrentUser); // Gets logged in user
router.patch(
    "/me",
    tokenChecker,
    // update.single("avatar"),
    UsersController.Update
);

module.exports = router;
