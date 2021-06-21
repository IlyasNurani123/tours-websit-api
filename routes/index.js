const tourRouter = require("./tourRouter");
const userRouter = require("./userRouter");

module.exports.routeConfig = (app) => {
    app.use("/api/v1/tours", tourRouter);
    app.use("/api/v1/users", userRouter);
  };
  

  