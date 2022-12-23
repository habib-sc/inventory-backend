const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;

const brandSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please provide a brand name"],
        maxLenght: 100,
        unique: true,
        lowercase: true,
    },
    description: String,
    email: {
        type: String,
        validate: [validator.isEmail, "Please provide a valid email"],
        lowercase: true,
    },
    website: {
        type: String,
        validate: [validator.isURL, "Please provide a valid url."]
    },
    location: String,
    products: [
        {
            type: ObjectId,
            ref: "Product"
        }
    ],
    suppliers: [{
        name: String,
        ContactNumber: String,
        id: {
            type: ObjectId,
            ref: "Supplier"
        }
    }],
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, { timestamps: true });

const Brand = brandSchema.mongoose.model("Brand", brandSchema);

module.exports = Brand;