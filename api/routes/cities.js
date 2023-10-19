const router = require("express").Router();
const CitiesController = require("../controllers/cities");

// router.get("/", CitiesController.Index); // Gets all city pins
router.post("/", CitiesController.Create); // Creates new city entry
// router.get("/:id", CitiesController.IndexById); // Gets city by id

module.exports = router;
