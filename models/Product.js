const mongoose = require('mongoose');

// Schema design 
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name for this product"],
        trim: true,  // extra space removing
        unique: [true, "Name must be uniqe"],
        minLength: [3, "Name must be at least 3 characters"],
        maxLength: [100, "Name is too large"],
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price can't be negetive"],
    },
    unit: {
        type: String,
        required: true,
        enum: {
            values: ["kg", "litre", "pcs"],
            message: "unit value can't be {VALUE}, must be kg/litre/pcs"
        },
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "Quantity can't be negative"],
        validate: {
            validator: (value) => {
                const isInteger = Number.isInteger(value); // validatinog quantity
                if (isInteger) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        message: "Quantity must be an integer"
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["in-stock", "out-of-stock", "discontinued"],
            message: "Status can't be {VALUE}"
        },
    },
    // supplier: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Supplier"
    // },
    // categories: [{
    //     name: {
    //         type: String,
    //         required: true,
    //     },
    //     _id: mongoose.Schema.Types.ObjectId
    // }],
    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    // },
    // updatedAt: {
    //     type: Date,
    //     default: Date.now,
    // }

}, { timestamps: true });


// middlewear { pres / post } for prodcut schema 
productSchema.pre('save', function (next) {
    console.log("Before Saving Data");
    if (this.quantity == 0) {
        this.status = 'out-of-stock'
    }
    next();
});
// productSchema.post('save', function (doc, next) {
//     console.log("After Saving Data");
//     next()
// });


productSchema.methods.logger = function () {
    console.log(`Data Saved for ${this.name}`);
};


// Schema -> Model -> Query 
// Product Model 
const Product = mongoose.model('Product', productSchema);

module.exports = Product;