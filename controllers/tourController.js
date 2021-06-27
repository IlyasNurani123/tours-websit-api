const TourService = require("../services/tourService");

const constant = require("../constants");

class TourController {

    static async createTour(req, res, next) {
        try {
            const tourService = new TourService(req);
            const result = await tourService.createTour(req.body);
            res.status(201).json({
                status: "success",
                data: result,
                message: constant.tourMessage.TOUR_CREATED,

            });
        } catch (error) {
            next(error);
        }

    }

    static async getAlltour(req, res, next) {

        try {
            const tourServices = new TourService;
            const result = await tourServices.getAlltour();
            res.status(200).json({
                status: "success",
                data: result

            });
        }
        catch (error) {
            next(error);
        }
    }

    static async getTour(req, res, next) {

        try {
            const tourServices = new TourService(req);
            const result = await tourServices.getTour(req.params.id);
            res.status(200).json({
                status: "success",
                data: result

            });
        }
        catch (error) {
            next(error);
            // throw new Error(error);
        }
    }

    static async updateTour(req, res, next) {

        try {
            const tourServices = new TourService(req);
            const result = await tourServices.updateTour({
                id: req.params.id,
                updateInfo: req.body
            });
            res.status(200).json({
                status: "success",
                data: result

            });
        }
        catch (error) {
            next(error)
            // throw new Error(error);
        }
    }

    static async deleteTour(req, res, next) {

        try {
            const tourServices = new TourService(req);
            const result = await tourServices.deleteTour(req.params.id);
            res.status(200).json({
                status: "success",
                data: result,
                message: constant.tourMessage.TOURE_DELETED,
            });
        }
        catch (error) {
            next(error);
            // throw new Error(error);
        }
    }

}

module.exports = TourController;