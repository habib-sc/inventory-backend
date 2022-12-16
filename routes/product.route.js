const express = require('express');
const router = express.Router();
const productControler = require('../controllers/product.controller');

router.route('/')
    .get(productControler.getProducts)
    .post(productControler.createProduct)

module.exports = router;