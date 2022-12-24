const express = require('express');
const router = express.Router();
const productControler = require('../controllers/product.controller');

const uploader = require('../middleware/uploader')

router.route('/')
    .get(productControler.getProducts)
    .post(productControler.createProduct)

router.route('/bulk-update')
    .patch(productControler.bulkUpdateProducts)

router.route('/bulk-delete')
    .delete(productControler.bulkDeleteProducts)

router.route('/image-upload')
    .post(uploader.single("image"), productControler.imageUpload)

router.route('/:id')
    .patch(productControler.updateProduct)
    .delete(productControler.deleteProduct)

module.exports = router;