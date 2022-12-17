const express = require('express');
const router = express.Router();
const productControler = require('../controllers/product.controller');

router.route('/')
    .get(productControler.getProducts)
    .post(productControler.createProduct)

router.route('/:id')
    .patch(productControler.updateProduct)

module.exports = router;