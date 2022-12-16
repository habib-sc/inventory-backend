const express = require('express');
const cors = require('cors');

// Creating app 
const app = express();

// Middlewear 
app.use(express.json());
app.use(cors());

// routes 
const productRoute = require('./routes/product.route');



app.get("/", (req, res) => {
    res.send("Inventory Management Server");
});

app.use('/api/v1/product', productRoute);

module.exports = app;