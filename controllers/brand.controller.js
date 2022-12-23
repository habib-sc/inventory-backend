const { createBrandService, getBrandsService } = require("../services/brand.service");


exports.getBrands = async (req, res, next) => {
    try {
        const brands = await getBrandsService();

        res.status(200).json({
            status: 'success',
            message: 'Brands found successfully',
            data: brands,
        });

    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Can't get the data",
            error: error.message,
        });
    }
};

exports.createBrand = async (req, res, next) => {
    try {
        const result = await createBrandService(req.body);

        res.status(200).json({
            status: 'success',
            message: 'Brand Created successfully',
            data: result,
        });

    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Couldn't create the brand",
            error: error.message,
        });
    }
};