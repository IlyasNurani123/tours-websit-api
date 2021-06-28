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
      return formateMongoData(result);
    } catch (error) {
      console.log("Some went wrong : services :create tour!");
      throw new Error(error)
    }
  }

  getAlltour = async (dataQuery) => {
    try {
      const queryObj = { ...dataQuery }
      const excludeQueryData = ['page', 'sort', 'limit', 'fields']
      excludeQueryData.map((el) => delete queryObj[el])

      const query = Tour.find(queryObj);
      // const tours = await Tour.find()
      //   .where("duration")
      //   .equals(5)
      //   .where("diffculty")
      //   .equals("easy");
      const tours = await query;
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