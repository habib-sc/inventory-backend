const Product = require('../models/Product');
const Brand = require('../models/Brand');

exports.getProductsService = async (filters, queries) => {
    // const products = await Product.find({ status: query.status, page: query.page, limit: query.limit }); 
    const products = await Product.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy);

    const totalProducts = await Product.countDocuments(filters);
    const pageCount = Math.ceil((totalProducts / queries.limit));
    return { totalProducts, pageCount, products };
};

exports.createProductService = async (data) => {
    // const product = new Product(req.body); 
    // const result = await product.save(); 
    const product = await Product.create(data);

    // getting productId and brand from created product 
    const { _id: productId, brand } = product;

    // Updating the brand with pushing productId 
    const result = await Brand.updateOne(
        { _id: brand.id },
        { $push: { products: productId } }
    );

    console.log(result);


    return product;
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


exports.deleteProductService = async (id) => {
    const result = await Product.deleteOne({ _id: id });
    return result;
};


exports.bulkDeleteProductsService = async (ids) => {
    const result = await Product.deleteMany({ _id: ids });

    return result;
};