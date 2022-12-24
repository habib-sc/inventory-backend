const Product = require("../models/Product");
const { getProductsService, createProductService, updateProductService, bulkUpdateProductsService, deleteProductService, bulkDeleteProductsService } = require("../services/product.service");

exports.getProducts = async (req, res, next) => {
    try {

        // const products = await Product
        //     .where("name").equals(/\w/)
        //     .where("quantity").lt(100)
        //     .limit(2);

        let filters = { ...req.query };
        const excludeFlieds = ['sort', 'page', 'limit'];
        excludeFlieds.forEach(field => delete filters[field]);

        //gt, lt, gte, lte
        // Adding $ sign in query operator by replace method 
        let filtersString = JSON.stringify(filters);
        filtersString = filtersString.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
        filters = JSON.parse(filtersString);

        const queries = {};

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            queries.sortBy = sortBy;
        };

        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            queries.fields = fields;
        };

        if (req.query.page) {
            //50 page, Each page 10 product, 
            // page 1 -> 1-10 
            // page 2-> 11-20
            // page 3-> 21-30 -> skip -> 1-20 = 2*10
            // page 4-> 31-40
            // page 5-> 41-50

            const { page = 1, limit = 3 } = req.query;
            const skip = (page - 1) * parseInt(limit);
            queries.skip = skip;
            queries.limit = limit;
        };

        if (req.query.limit) {
            const limit = req.query.limit;
            queries.limit = limit;
        };



        const products = await getProductsService(filters, queries);

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

exports.updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateProductService(id, req.body);
        if (result.modifiedCount) {
            res.status(200).json({
                status: 'success',
                message: 'Data Updated Successfully',
            });
        }
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Could't update the product",
            error: error.message,
        });
    }
};

exports.bulkUpdateProducts = async (req, res, next) => {
    try {
        const result = await bulkUpdateProductsService(req.body);
        if (result) {
            res.status(200).json({
                status: 'success',
                message: 'Bulk Products Updated Successfully',
            });
        }
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Could't update the product",
            error: error.message,
        });
    }
};


exports.deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await deleteProductService(id);
        if (result.deletedCount) {
            res.status(200).json({
                status: 'success',
                message: 'Product Deleted Successfully',
            });
        }
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Could't delete the product",
            error: error.message,
        });
    }
};


exports.bulkDeleteProducts = async (req, res, next) => {
    try {
        const result = await bulkDeleteProductsService(req.body.ids);
        if (result) {
            res.status(200).json({
                status: 'success',
                message: 'Bulk Products Deleted Successfully',
            });
        }
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Could't delete bulk products",
            error: error.message,
        });
    }
};