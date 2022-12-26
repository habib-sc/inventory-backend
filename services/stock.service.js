const Stock = require('../models/Stock');

exports.getStocksService = async (filters, queries) => {
    // const Stocks = await Stock.find({ status: query.status, page: query.page, limit: query.limit }); 
    const stocks = await Stock.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy);

    const totalStocks = await Stock.countDocuments(filters);
    const pageCount = Math.ceil((totalStocks / queries.limit));
    return { totalStocks, pageCount, stocks };
};

exports.getStockByIdService = async (stockId) => {
    const stock = await Stock.findOne({ _id: stockId })
        .populate("store")
        .populate("suppliedBy")
        .populate("brand");
    return stock;
};

exports.createStockService = async (data) => {
    // const stock = new Stock(req.body); 
    // const result = await Stock.save(); 
    const stock = await Stock.create(data);
    return stock;
};

// exports.updateStockService = async (stockId, data) => {
//     // const result = await Stock.updateOne({ _id: StockId }, { $set: data  }, { runValidators: true });
//     // const result = await Stock.updateOne({ _id: StockId }, { $inc: data }, { runValidators: true });

//     const stock = await Stock.findById(stockId);
//     const result = await stock.set(data).save();
//     return result;
// };


// exports.bulkUpdateStocksService = async (data) => {
//     // const result = await Stock.updateMany({ _id: data.ids }, data.data, { runValidators: true });

//     const stocks = [];

//     data.bulkStocks.forEach(bulkStock => {
//         stocks.push(Stock.updateOne({ _id: bulkStock.id }, bulkStock.data));
//     });

//     const result = await Promise.all(stocks);
//     return result;
// };


// exports.deleteStockService = async (id) => {
//     const result = await Stock.deleteOne({ _id: id });
//     return result;
// };


// exports.bulkDeleteStocksService = async (ids) => {
//     const result = await Stock.deleteMany({ _id: ids });

//     return result;
// };