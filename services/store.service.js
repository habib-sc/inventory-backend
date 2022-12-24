const Store = require("../models/Store");

exports.getStoresService = async () => {
    const stores = await Store.find({});
    return stores;
};

exports.createStoreService = async (data) => {
    const result = await Store.create(data);
    return result;
};