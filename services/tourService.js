const BaseService = require("./base.service");
const Filter = require("../utlis/helper/filter");
const Tour = require("../database/models/tourModel");
const { formateMongoData, checkObjectId } = require("../utlis/helper/dbHelper");


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

  getAlltours = async (dataQuery) => {
    try {
      const filtrData = new Filter(Tour.find(), dataQuery).filterData().sort().limitFields().paginate();
      const tours = await filtrData.query;
      console.log("::::::::::::::::::::::::::::::", tours);
      return formateMongoData(tours);
    } catch (error) {
      console.log("Some went wrong :: get Tours in touService class");
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

  getTourStatsService = async (req) => {
    try {
      const stats = await Tour.aggregate([
        {
          $match: { ratingsAverage: { $gte: 3 } }
        },
        {
          $group: {
            _id: { $toUpper: '$diffculty' },
            numTour: { $sum: 1 },
            numRating: { $sum: '$ratingsQuantity' },
            avgRating: { $avg: '$ratingsAverage' },
            avgPrice: { $avg: '$price' },
            minPrice: { $min: '$price' },
            maxPrice: { $max: '$price' },
          }
        }, {
          $sort: { avgPrice: 1 }
        }
      ])
      return stats;
    } catch (error) {
      console.log("Some went wrong :: GetTourStatsServiceTour inn Toue Stats service class");
      throw new Error(error);
    }
  }


  getMonthlyPlanService = async (req) => {
    try {
      const year = req.year * 1;
      const monthlyPlane = await Tour.aggregate([
        {
          $unwind: "$startDates"
        },
        {
          $match: {
            startDates: {
              $gte: new Date(`${year}-01-01`),
              $lte: new Date(`${year}-12-31`),
            }
          }
        },
        {
          $group: {
            _id: { $month: '$startDates' },
            numTourStart: { $sum: 1 },
            tours: { $push: '$name' }
          }
        },
      ])
      return monthlyPlane;
    } catch (error) {
      console.log("Some went wrong :: GetTourStatsServiceTour inn Toue Stats service class");
      throw new Error(error);
    }
  }

}

module.exports = TourServices;