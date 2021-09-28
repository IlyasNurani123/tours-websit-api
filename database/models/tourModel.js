const mongoose = require("mongoose");

const { Schema } = mongoose;

const tourSchema = new Schema({
    name: {
        type: String,
        required: [true, "A tour must have a name"],
        unique: true,
        trim: true
    },
    duration: {
        type: Number,
        required: [true, "A tour mush have a duration"]
    },
    maxGroupSize: {
        type: Number,
        required: [true, "A tour must have a group size"]
    },
    diffculty: {
        type: String,
        required: [true, "A tour must have a difculty"]
    },
    ratingsAverage: {
        type: Number,
        default: 4.5
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, "A tour must have a price"]
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim: true,
        required: [true, "A tour must have a description"]
    },
    description: {
        type: String,
        trim: true,
    },
    imageCover: {
        type: String,
        required: [true, "A tour must have a cover image"]
    },
    images: [String],
    startDates: [Date]
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }

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
    },
);

tourSchema.virtual('durationWeeks').get(function () {
    console.log(this.duration / 7);
    return this.duration / 7;
});

tourSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;