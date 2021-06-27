const express = require("express");

const router = express.Router();

const TourController = require("../controllers/tourController");

router.post("/",TourController.createTour);
router.get("/",TourController.getAlltour);
router.get("/:id",TourController.getTour);

module.exports = router