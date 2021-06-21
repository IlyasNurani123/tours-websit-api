const mongoose = require("mongoose");

const { Schema } = mongoose;

const tourSchema = new Schema({
    name:{
        type:String,
        require:[true, "A tour must have a name"],
        unique:true
    },
    rating:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        require:[true, "A tour must have a price"]
    }

});

const Tour = mongoose.model("Tour",tourSchema);

module.exports = Tour;