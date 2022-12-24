const { getStoresService, createStoreService } = require("../services/store.service");

exports.getStores = async (req, res, next) => {
    try {
        const stores = await getStoresService();

        if (!stores) {
            res.status(400).json({
                status: 'Failed',
                message: 'Could not get stores',
            });
            return;
        }

        res.status(200).json({
            status: 'success',
            message: 'Stores found successfully',
            data: stores,
        });

    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Can't get the data",
            error: error.message,
        });
    }
};

exports.createStore = async (req, res, next) => {
    try {
        const result = await createStoreService(req.body);

        if (!result._id) {
            res.status(400).json({
                status: 'Failed',
                message: 'Could not create the store',
            });
            return;
        }

        res.status(200).json({
            status: 'success',
            message: 'Store Created successfully',
            data: result,
        });

    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Couldn't create the store",
            error: error.message,
        });
    }
};