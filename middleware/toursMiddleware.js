
class ToursMiddleware {

    static aliasTopTours = (req, res, next) => {
        req.query.limit = "5";
        req.query.sort = "-ratingsAverage, price";
        req.query.fields = "name,price ,ratingAvg,summary,diffculty,summary";
        next()
    }

}

module.exports = ToursMiddleware;