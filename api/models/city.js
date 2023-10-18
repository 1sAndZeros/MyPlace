const mongoose = require("mongoose");

const CitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    recommendations:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recommendation"
        }
    ],
    memories: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Memory"
        }
    ],
    visited: { type: Boolean, required: true },
    visitedDate: { type: Date, required: true },
    rating: { type: Number }
})

const City = mongoose.model("City", CitySchema);

module.exports = City;
