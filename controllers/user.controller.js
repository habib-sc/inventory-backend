const { signupService } = require("../services/user.service");


exports.signup = async (req, res, next) => {
    try {
        const user = await signupService(req.body);

        if (!user) {
            res.status(400).json({
                status: "Failed",
                error: "Couldn't Sign Up",
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Sign Up successfull',
            data: user,
        });

    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Couldn't Sign Up",
            error: error.message,
        });
    }
};