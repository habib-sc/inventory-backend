const { getProductsService, createProductService } = require("../services/product.services");

exports.getProducts = async (req, res, next) => {
    try {

        // const products = await Product
        //     .where("name").equals(/\w/)
        //     .where("quantity").lt(100)
        //     .limit(2);

        const products = await getProductsService();

        res.status(200).json({
            status: 'success',
            message: 'Data found successfully',
            data: products,
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Can't get the data",
            error: error.message,
        });
    }
};

exports.createProduct = async (req, res, next) => {
    try {
        const result = await createProductService(req.body);
        result.logger();
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
};