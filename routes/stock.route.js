const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stock.controller');

router.route('/')
    .get(stockController.getStocks)
    .post(stockController.createStock)

// router.route('/bulk-update')
//     .patch(stockController.bulkUpdatestocks)

// router.route('/bulk-delete')
//     .delete(stockController.bulkDeletestocks)

router.route('/:id')
    .get(stockController.getStockById)
// .patch(stockController.updateStock)
// .delete(stockController.deleteStock)

module.exports = router;