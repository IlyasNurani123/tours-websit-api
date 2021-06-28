const mongoose = require("mongoose");

const { Schema } = mongoose;

const tourSchema = new Schema({
    name: {
        type: String,
        required: [true, "A tour must have a name"],
        unique: true
    },
    rating: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, "A tour must have a price"]
    }
},
    {
        timestamps: true,
        toObject: {
            transform: function (doc, ret, option) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                return ret;

            }
        }
    });

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;