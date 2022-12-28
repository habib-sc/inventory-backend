const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { ObjectId } = mongoose.Schema.Types;

const userSchema = mongoose.Schema({
    email: {
        type: String,
        validate: [validator.isEmail, "Provide a valid email"],
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "Please provide a category name"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        validate: {
            validator: (value) => {
                validator.isStrongPassword(value, {
                    minLength: 6,
                    minLowercase: 3,
                    minNumber: 1,
                    minUppercase: 1,
                    minSymbles: 1,
                })
            },
            message: "Password {VALUE} is not strong enough.",
        },
    },
    confirmPassword: {
        type: String,
        required: [true, "Confirm password is required"],
        validate: {
            validator: function (value) {
                return value === this.password;
            },
            message: "Passwords don't match",
        },
    },
    role: {
        type: String,
        enum: ["buyer", "store-manager", "admin"],
        default: "buyer",
    },
    firstName: {
        type: String,
        trim: true,
        required: [true, "Please provide First name"],
        minLength: [3, "First name must be at least 3 charactgers."],
        maxLength: [100, "First name is too large"]
    },
    lastName: {
        type: String,
        trim: true,
        minLength: [3, "Last name must be at least 3 charactgers."],
        maxLength: [100, "Last name is too large"]
    },
    contactNumber: {
        type: String,
        validate: [validator.isMobilePhone, "Please provide a valid contact number"],
    },
    shippingAddress: String,
    imageURL: {
        type: String,
        validate: [validator.isURL, "Please provide a valid url"],
    },
    status: {
        type: String,
        default: "active",
        enum: ["active", "inactive", "blocked"],
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,

}, { timestamps: true });

// hasshing password before saving data with pre middleware 
userSchema.pre("save", function (next) {
    const password = this.password;

    const hashedPassword = bcrypt.hashSync(password);
    this.password = hashedPassword;
    this.confirmPassword = undefined;

    next();
})

const User = mongoose.model("User", userSchema);

module.exports = User;