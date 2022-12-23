const { createBrandService, getBrandsService, getBrandByIdService, updateBrandService } = require("../services/brand.service");


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

exports.getBrandById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const brand = await getBrandByIdService(id);

        if (!brand) {
            res.status(400).json({
                status: "failed",
                error: "Couldn't find the brand with this id"
            })
        };

        res.status(200).json({
            status: 'success',
            message: 'Brand found successfully',
            data: brand,
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

exports.updateBrand = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await updateBrandService(id, req.body);
        console.log(result);
        if (!result.modifiedCount) {
            res.status(400).json({
                status: "failed",
                error: "Couldn't update the brand with this id"
            })
        };

        res.status(200).json({
            status: 'success',
            message: 'Brand Updated successfully',
        });

    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Couldn't update the brand",
            error: error.message,
        });
    }
};