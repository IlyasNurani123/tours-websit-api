const express = require("express");

const router = express.Router();

const TourController = require("../controllers/tourController");

router.post("/", TourController.createTour);
router.get("/", TourController.getAlltour);
router.get("/:id", TourController.getTour);
router.put("/:id", TourController.updateTour);
router.delete("/:id", TourController.deleteTour);

module.exports = router