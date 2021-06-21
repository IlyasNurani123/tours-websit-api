const TourService = require("../services/tourService");

class TourController {

    static async createTour(request,res,next){
        try{
            const tourService = new TourService(request);
            const result = await tourService.createTour(request.body);
            res.status(200).json(result);
        }catch(error){
            next(error)
        }
    }
}

module.exports = TourController;