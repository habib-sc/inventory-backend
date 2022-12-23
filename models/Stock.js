const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;

// Schema design 
const stockSchema = mongoose.Schema({
    productId: {
        type: ObjectId,
        required: true,
        ref: "Product"
    },
    name: {
        type: String,
        required: [true, "Please provide a name for this product"],
        trim: true,  // extra space removing
        unique: [true, "Name must be uniqe"],
        lowercase: true,
        minLength: [3, "Name must be at least 3 characters"],
        maxLength: [100, "Name is too large"],
    },
    description: {
        type: String,
        required: true,
    },
    unit: {
        type: String,
        required: true,
        enum: {
            values: ["kg", "litre", "pcs", "bag"],
            message: "unit value can't be {VALUE}, must be kg/litre/pcs/bag"
        },
    },
    imageURLs: [{
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                if (!Array.isArray(value)) {
                    return false;
                }
                let isValid = true;
                value.forEach(url => {
                    if (!validator.isURL(url)) {
                        isValid = false;
                    }
                });
                return isValid;
            },
            message: "Please provide valid image urls"
        },
    }],
    price: {
        type: Number,
        required: true,
        min: [0, "price can't be negative"]
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "quantity can't be negative"]
    },
    category: {
        type: String,
        requred: true,
    },
    brand: {
        name: {
            type: String,
            required: true,
        },
        id: {
            type: ObjectId,
            ref: "Brand",
            required: true,
        }
    },
    store: {
        name: {
            type: String,
            trim: true,
            required: [true, "Please provide a store name"],
            lowercase: true,
            enum: {
                values: ["dhaka", "chattogram", "rajshahi", "sylhet", "khulna", "barisal", "rangpur", "mymensingh"],
                message: "{VALUE} is not valid store name"
            },
            description: String,
        },
        id: {
            type: ObjectId,
            required: true,
            ref: "Store"
        }
    },
    suppliedBy: {
        name: {
            type: String,
            trim: true,
            required: [true, "Please provide a supplier name"],
        },
        id: {
            type: ObjectId,
            ref: "Supplier"
        },
    },
    status: {
        type: String,
        require: true,
        enum: {
            values: ["in-stock", "out-of-stock", "discontinued"],
            message: "Status can't be {VALUE}"
        },
    }

}, { timestamps: true });


// middlewear { pres / post } for prodcut schema 
// productSchema.pre('save', function (next) {
//     console.log("Before Saving Data");
//     if (this.quantity == 0) {
//         this.status = 'out-of-stock'
//     }
//     next();
// });


const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;