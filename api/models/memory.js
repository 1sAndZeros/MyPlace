const mongoose = require("mongoose")

const MemorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    message: { type: String, required: true },
    photos: [{ type: String }]
})

const Memory = mongoose.model("Memory", MemorySchema);

module.exports = Memory;