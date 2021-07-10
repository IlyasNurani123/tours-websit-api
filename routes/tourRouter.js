const express = require("express");

const router = express.Router();

const TourController = require("../controllers/tourController");
const ToursMiddleware = require("../middleware/toursMiddleware");

router
    .route("/")
    .post(TourController.createTour)
    .get(TourController.getAlltours);
router
    .route("/:id")
    .get(TourController.getTour)
    .put(TourController.updateTour)
    .delete(TourController.deleteTour)
router.route("/top-5-cheap").get(ToursMiddleware.aliasTopTours, TourController.getAlltours);

module.exports = router
