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

      // Advance Filter
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => (`$${match}`));
      console.log(JSON.parse(queryStr))
      // Simple Filter
      let query = Tour.find(JSON.parse(queryStr));
      if (dataQuery.sort) {
        const sortBy = dataQuery.sort.split(',').join(' ');
        console.log(sortBy);
        query = query.sort(sortBy);
      } else {
        query = query.sort('-createdAt');
      }

      if (dataQuery.fields) {
        const fields = dataQuery.fields.split(',').join(' ');
        query = query.select(fields);
      }

      const page = dataQuery.page * 1 || 1;
      const limit = dataQuery.limit * 1 || 1;
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);

      if (dataQuery.page) {
        const numTours = await Tour.countDocuments();
        if (skip >= numTours) throw new Error("This Page doesn't exist")

      }

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