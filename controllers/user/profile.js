const { body, param } = require("express-validator");
const asyncHandler = require("../../middlewares/asyncHandler");
const User = require("../../models/User");
const ErrorResponse = require("../../utils/ErrorResponse");

exports.checkGetUserByUsername = [
    param("username").custom(async (value, { req }) => {
        
        const userDoc = await User.findOne({ username: value });

        if (!userDoc) {
            throw new ErrorResponse("No Such User Found", 404);
        }

        req.userDoc = userDoc;

        return true;
    }),
];

exports.checkGetUserById = [
    param("userId").custom(async (value, { req }) => {
        const userDoc = await User.findById(value);

        if (!userDoc) {
            throw new ErrorResponse("No Such User Found", 404);
        }

        req.userDoc = userDoc;

        return true;
    }),
];

exports.getLoggedInUserData = asyncHandler(async (req, res) => {
    const userId = req.authUser.staticId;

    const userDoc = await User.findById(userId);

    return res.status(200).json({
        message: "User Found Successfully",
        userData: userDoc,
    });
});

exports.getUserDataByUsername = asyncHandler(async (req, res) => {

    const { userDoc } = req;

    return res.status(200).json({
        message: "User Found Successfully",
        userData: userDoc,
    });
});

exports.getUserDataById = asyncHandler(async (req, res) => {
    const { userDoc } = req;

    return res.status(200).json({
        message: "User Found Successfully",
        userData: userDoc,
    });
});
