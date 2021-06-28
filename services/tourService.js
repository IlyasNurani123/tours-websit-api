const BaseService = require("./base.service");
const Tour = require("../database/models/tourModel");
const { formateMongoData, checkObjectId } = require("../helper/dbHelper");


class TourServices extends BaseService {

  constructor(request) {
    super(request);
  };

  createTour = async (serviceData) => {
    try {
      let tour = new Tour(serviceData);
      console.log("tour", tour);
      let result = await tour.save();
      return result;
    } catch (error) {
      console.log("Some went wrong : services :create tour!");
      throw new Error(error)
    }
  }

  getAlltour = async () => {
    try {
      let tours = await Tour.find({});
      return formateMongoData(tours);
    } catch (error) {
      console.log("Some went wrong :: get Tours inn touService class");
      throw new Error(error);
    }
  }

  getTour = async (id) => {
    try {
      checkObjectId(id);
      let tour = await Tour.findById(id);
      return formateMongoData(tour);
    } catch (error) {
      console.log("Some went wrong :: get Tours inn touService class");
      throw new Error(error);
    }
  }

  updateTour = async ({ id, updateInfo }) => {

    try {
      checkObjectId(id);
      let tour = await Tour.findOneAndUpdate(id, updateInfo, {
        new: true,
        runValidators: true
      });
      return formateMongoData(tour);
    } catch (error) {
      console.log("Some went wrong : services : updateProduct");
      throw new Error(error);
    }
  }

  deleteTour = async (id) => {
    try {
      checkObjectId(id);
      let tour = await Tour.findByIdAndDelete(id);
      return formateMongoData(tour);
    } catch (error) {
      console.log("Some went wrong :: Delete Tour inn touService class");
      throw new Error(error);
    }
  }
}

module.exports = TourServices;