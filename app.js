const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Creating app 
const app = express();

// Middlewear 
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    res.send("Inventory Management Server");
});

module.exports = app;