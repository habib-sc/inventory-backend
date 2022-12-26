const Stock = require("../models/Stock");
const { getStocksService, createStockService, updateStockService, bulkUpdateStocksService, deleteStockService, bulkDeleteStocksService, getStockByIdService } = require("../services/stock.service");

exports.getStocks = async (req, res, next) => {
    try {

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
            //50 page, Each page 10 Stock, 
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



        const Stocks = await getStocksService(filters, queries);

        res.status(200).json({
            status: 'success',
            message: 'Data found successfully',
            data: Stocks,
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Can't get the data",
            error: error.message,
        });
    }
};

exports.getStockById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const stock = await getStockByIdService(id);
        if (!stock) {
            res.status(200).json({
                status: 'Failded',
                error: 'Stock not found',
            });
        }
        res.status(200).json({
            status: 'success',
            data: stock,
        });

    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Stock not found",
            error: error.message,
        });
    }
};

exports.createStock = async (req, res, next) => {
    try {
        const result = await createStockService(req.body);
        res.status(200).json({
            status: 'success',
            message: 'Stock Created Successfully',
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

// exports.updateStock = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const result = await updateStockService(id, req.body);
//         if (result.modifiedCount) {
//             res.status(200).json({
//                 status: 'success',
//                 message: 'Data Updated Successfully',
//             });
//         }
//     } catch (error) {
//         res.status(400).json({
//             status: "Failed",
//             message: "Could't update the Stock",
//             error: error.message,
//         });
//     }
// };

// exports.bulkUpdateStocks = async (req, res, next) => {
//     try {
//         const result = await bulkUpdateStocksService(req.body);
//         if (result) {
//             res.status(200).json({
//                 status: 'success',
//                 message: 'Bulk Stocks Updated Successfully',
//             });
//         }
//     } catch (error) {
//         res.status(400).json({
//             status: "Failed",
//             message: "Could't update the Stock",
//             error: error.message,
//         });
//     }
// };


// exports.deleteStock = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const result = await deleteStockService(id);
//         if (result.deletedCount) {
//             res.status(200).json({
//                 status: 'success',
//                 message: 'Stock Deleted Successfully',
//             });
//         }
//     } catch (error) {
//         res.status(400).json({
//             status: "Failed",
//             message: "Could't delete the Stock",
//             error: error.message,
//         });
//     }
// };


// exports.bulkDeleteStocks = async (req, res, next) => {
//     try {
//         const result = await bulkDeleteStocksService(req.body.ids);
//         if (result) {
//             res.status(200).json({
//                 status: 'success',
//                 message: 'Bulk Stocks Deleted Successfully',
//             });
//         }
//     } catch (error) {
//         res.status(400).json({
//             status: "Failed",
//             message: "Could't delete bulk Stocks",
//             error: error.message,
//         });
//     }
// };