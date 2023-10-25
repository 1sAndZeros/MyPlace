const router = require("express").Router();
const CitiesController = require("../controllers/cities");

router.get("/", CitiesController.Index); // Gets all city pins
router.get("/me", CitiesController.IndexMyCities); // Gets logged in users city pins
router.get("/:id", CitiesController.IndexCityById); // Gets city pin by city id
router.get("/user/:id", CitiesController.IndexUserCities); // Gets city pins for specific user
router.post("/", CitiesController.Create); // Creates new city entry
router.patch("/:id", CitiesController.Update); // Update city entry
router.delete("/:id", CitiesController.Delete); // Delete city entry

module.exports = router;
