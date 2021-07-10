class Filter {

    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filterData = () => {
        const queryObj = { ...this.queryString }
        const excludeQueryData = ['page', 'sort', 'limit', 'fields']
        excludeQueryData.map((el) => delete queryObj[el])

        // Advance Filter
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => (`$${match}`));
        console.log(JSON.parse(queryStr))
        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }


    sort = () => {
        // sortting 

        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }

        return this;

    }

    limitFields = () => {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        }
        return this;
    }

    paginate = () => {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);

        return this;
        // if (this.queryString.page) {
        //     const numTours = await Tour.countDocuments();
        //     if (skip >= numTours) throw new Error("This Page doesn't exist")

        // }
    }
}

module.exports = Filter;