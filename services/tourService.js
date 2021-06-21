const BaseService = require("./base.service");
const Tour = require("../database/models/tourModel");
const constant = require("../constants");

class TourServices extends BaseService{
    
    constructor(request) {
        super(request);
      }

      createTour = async (serviceData) => {
               try{
                   let tour = new Tour(serviceData);
                    let result = await tour.save()
                      
                    }catch(error){
                        console.log("Some went wrong : services :create tour!");
                        throw new Error(error)
                    }
      }
}

module.exports = TourServices;