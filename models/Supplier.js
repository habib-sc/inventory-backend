const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;

const supplierSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Provide a supplier name"],
        trim: true,
        lowercase: true,
        minLength: [3, "Name must be at least 3 characters"],
        maxLength: [100, "Name is too large"],
    },
    email: {
        type: String,
        validator: [validator.isEmail, "Provide a valid email"],
        trim: true,
        lowercase: true,
        unique: true,
    },
    brand: {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        id: {
            type: ObjectId,
            required: true,
            ref: "Brand"
        }
    },
    contactNumber: [{
        type: String,
        required: [true, "Please provide a contact number"],
        validate: {
            validator: (value) => {
                return validator.isMobilePhone(value);
            },
            message: "Please provide a valid phone number"
        }
    }],
    emergencyContactNumber: {
        type: String,
        required: [true, "Please provide a emergency contact number"],
        validate: {
            validator: (value) => {
                return validator.isMobilePhone(value);
            },
            message: "Please Provide a valid emergency contact number"
        }
    },
    tradeLicenceNumber: {
        type: Number,
        required: [true, "Please provide supplier trade licence number"],
    },
    address: {
        type: String,
    },
    location: {
        type: String,
        required: true,
        lowercase: true,
        enum: {
            values: ["dhaka", "chattogram", "rajshahi", "sylhet", "khulna", "barisal", "rangpur", "mymensingh"],
            message: "{VALUE} is not valid supplier location"
        }
    },
    imageURL: {
        type: String,
        validator: [validator.isURL, "Please provide a valid url"],

    },
    nationalIdImageURL: {
        type: String,
        requred: true,
        validator: [validator.isURL, "Please provide a valid url"],
    },
    status: {
        type: String,
        default: "active",
        enum: ["active", "inactive"]
    },

}, { timestamps: true });