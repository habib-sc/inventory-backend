const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;

const storeSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please provide a store name"],
        lowercase: true,
        enum: {
            values: ["dhaka", "chattogram", "rajshahi", "sylhet", "khulna", "barisal", "rangpur", "mymensingh"],
            message: "{VALUE} is not valid store name"
        },
        unique: true,
    },
    description: String,
    manager: {
        name: String,
        constactNumber: String,
        id: {
            type: ObjectId,
            ref: "User"
        },
    },

}, { timestamps: true });

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;