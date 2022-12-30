const { signupService, finUserByEmailService } = require("../services/user.service");
const bcrypt = require('bcryptjs');
const { generateToken } = require("../utils/token");


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

/**
 * 1. check if email and password are given,
 * 2. load user with email,
 * 3. if not user send res,
 * 4. compare password
 * 5. if password not correct send res,
 * 6. check if user is active,
 * 7. if not active send res,
 * 8. generate token,
 * 9. send user and token
 */
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // checking email and password given or not 
        if (!email || !password) {
            return res.status(401).json({
                status: "Failed",
                error: "Please provide your credentials"
            });
        }

        // Loading user 
        const user = await finUserByEmailService(email);
        // if not user sending res 
        if (!user) {
            return res.status(401).json({
                status: "Failed",
                error: "No user found. Please create an accont"
            });
        }

        // comparing password with user model method
        const isPasswordValid = user.comparePassword(password, user.password);
        // if password not correct sending res 
        if (!isPasswordValid) {
            return res.status(403).json({
                status: "Failed",
                error: "Email or Password is incorrect"
            });
        }

        // checking user active or not and sending res 
        if (user.status != "active") {
            return res.status(403).json({
                status: "Failed",
                error: "Your account is not active"
            });
        }

        const token = generateToken(user);

        // getting user withoud password 
        const { password: pwd, ...userInfo } = user.toObject();

        // sending final res 
        res.status(200).json({
            status: "Success",
            message: "Login Successful",
            data: { userInfo, token },
        });


    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Couldn't Login",
            error: error.message,
        });
    }
};

exports.getMe = async (req, res, next) => {
    try {
        const user = await finUserByEmailService(req.user?.email);
        const { password, ...userInfo } = user.toObject();
        res.status(200).json({
            status: 'success',
            message: 'User Found',
            data: userInfo,
        });

    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Couldn't find user",
            error: error.message,
        });
    }
};