const TourService = require("../services/tourService");

class TourController {

    static async createTour(req,res,next){
        try{
            const tourService = new TourService(req);
            const result = await tourService.createTour(req.body);
            res.status(201).json({
                status:"success",
                data:result
                
            });
        }catch(error){
            next(error)
        }

    }

    static async getAlltour (req,res,next){

        try{
            const tourServices = new TourService;
            const result = await tourServices.getAlltour();
            res.status(201).json({
                status:"success",
                data:result
                
            });
        }
        catch(error){
            next(error);
        }
    }

    static async getTour (req,res,next){

        try{
            const tourServices = new TourService(req);
            const result = await tourServices.getTour(req.params);
            res.status(201).json({
                status:"success",
                data:result
                
            });
        }
        catch(error){
            next(error);
        }
    }

}

module.exports = TourController;