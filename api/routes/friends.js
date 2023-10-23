const express = require("express");
const router = express.Router();
const tokenChecker = require("../lib/tokenChecker");
const FriendsController = require("../controllers/friends");

router.post("/", FriendsController.Create); 
// router.get("/",  FriendsController.Index); 
// router.get("/me",  FriendsController.CurrentUser); 


module.exports = router;
