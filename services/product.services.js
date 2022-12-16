const Product = require('../models/Product');

exports.getProductsService = async () => {
    const products = await Product.find({});
    return products;
};

exports.createProductService = async (data) => {
    // const product = new Product(req.body); 
    // const result = await product.save(); 
    const result = await Product.create(data);
    return result;
};