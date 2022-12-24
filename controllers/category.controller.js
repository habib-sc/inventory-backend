const Category = require("../models/Category");
const { getCategoriesService, createCategoryService } = require("../services/category.service");

exports.getCategories = async (req, res, next) => {
    try {
        const categories = await getCategoriesService();

        if (!categories) {
            res.status(400).json({
                status: 'Failed',
                message: 'Could not create the category',
            });
            return;
        }

        res.status(200).json({
            status: 'success',
            message: 'Categories found successfully',
            data: categories,
        });

    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Can't get the data",
            error: error.message,
        });
    }
};

exports.createCategory = async (req, res, next) => {
    try {
        const result = await createCategoryService(req.body);

        if (!result._id) {
            res.status(400).json({
                status: 'Failed',
                message: 'Could not create the category',
            });
            return;
        }

        res.status(200).json({
            status: 'success',
            message: 'Category Created successfully',
            data: result,
        });

    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Couldn't create the category",
            error: error.message,
        });
    }
};