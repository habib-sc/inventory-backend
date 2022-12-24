const Category = require("../models/Category");

exports.getCategoriesService = async () => {
    const categories = await Category.find({});
    return categories;
};

exports.createCategoryService = async (data) => {
    const result = await Category.create(data);
    return result;
};