const { getSuppliersService, getSupplirByIdService, createSupplierService, updateSupplierService, getSupplierByIdService } = require("../services/supplier.service");

exports.getSuppliers = async (req, res, next) => {
    try {
        const suppliers = await getSuppliersService();

        res.status(200).json({
            status: 'success',
            message: 'Suppliers found successfully',
            data: suppliers,
        });

    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Can't get the data",
            error: error.message,
        });
    }
};

exports.getSupplierById = async (req, res, next) => {

    try {
        const supplierId = req.params.id;
        const supplier = await getSupplierByIdService(supplierId);

        if (!supplier) {
            res.status(400).json({
                status: "failed",
                error: "Couldn't find the supplier with this id"
            })
            return;
        };

        res.status(200).json({
            status: 'success',
            message: 'Supplier found successfully',
            data: supplier,
        });

    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Can't get the data",
            error: error.message,
        });
    }
};

exports.createSupplier = async (req, res, next) => {
    try {
        const result = await createSupplierService(req.body);

        res.status(200).json({
            status: 'success',
            message: 'Supplier Created successfully',
            data: result,
        });

    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Couldn't create the Supplier",
            error: error.message,
        });
    }
};

exports.updateSupplier = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await updateSupplierService(id, req.body);
        if (!result.modifiedCount) {
            res.status(400).json({
                status: "failed",
                error: "Couldn't update the Supplier with this id"
            })
        };

        res.status(200).json({
            status: 'success',
            message: 'Supplier Updated successfully',
        });

    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Couldn't update the supplier",
            error: error.message,
        });
    }
};