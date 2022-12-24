const Supplier = require('../models/Supplier');

exports.createSupplierService = async (data) => {
    const result = await Supplier.create(data);
    return result;
};

exports.getSuppliersService = async () => {
    const supplier = await Supplier.find({});
    return supplier;
};

exports.getSupplierByIdService = async (supplierId) => {
    const supplier = await Supplier.findOne({ _id: supplierId });
    return supplier;
};

exports.updateSupplierService = async (id, data) => {
    const result = await Supplier.updateOne({ _id: id }, data, {
        runValidators: true,
    });
    return result;
};