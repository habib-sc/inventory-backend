const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Creating app 
const app = express();

// Middlewear 
app.use(express.json());
app.use(cors());


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
            values: ["in-stock", "out-stock", "discontinued"],
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


// Schema -> Model -> Query 
// Product Model 
const Product = mongoose.model('Product', productSchema)


app.get("/", (req, res) => {
    res.send("Inventory Management Server");
});

app.post('/api/v1/product', async (req, res, next) => {
    try {
        // const product = new Product(req.body); 
        // const result = await product.save(); 
        const result = await Product.create(req.body);
        res.status(200).json({
            status: 'success',
            message: 'Data Inserted Successfully',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Data is not inserted",
            error: error.message,
        });
    }
});

module.exports = app;