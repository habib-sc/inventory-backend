const Product = require("../models/Product");
const { getProductsService, createProductService, updateProductService, bulkUpdateProductsService, deleteProductService, bulkDeleteProductsService } = require("../services/product.services");

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