const express = require("express");

const router = express.Router();

const TourController = require("../controllers/tourController");

router.post("/",TourController.createTour);

module.exports = router