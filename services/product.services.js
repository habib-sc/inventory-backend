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

exports.updateProductService = async (productId, data) => {
    // const result = await Product.updateOne({ _id: productId }, { $set: data  }, { runValidators: true });
    // const result = await Product.updateOne({ _id: productId }, { $inc: data }, { runValidators: true });

    const product = await Product.findById(productId);
    const result = await product.set(data).save();
    return result;
};


exports.bulkUpdateProductsService = async (data) => {
    // const result = await Product.updateMany({ _id: data.ids }, data.data, { runValidators: true });

    const products = [];

    data.bulkProducts.forEach(bulkProduct => {
        products.push(Product.updateOne({ _id: bulkProduct.id }, bulkProduct.data));
    });

    const result = await Promise.all(products);
    return result;
};