const { body, param } = require("express-validator");
const asyncHandler = require("../../middlewares/asyncHandler");
const User = require("../../models/User");
const ErrorResponse = require("../../utils/ErrorResponse");
const mongoose = require("mongoose");

const fetchUserDataById = asyncHandler(async (userId) => {
    const userByIdPipeline = [
        {
            $match: {
                _id: new mongoose.Types.ObjectId(`${userId}`),
            },
        },
        {
            $unwind: {
                path: "$transactions",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $lookup: {
                from: "transactions",
                localField: "transactions.transaction_id",
                foreignField: "_id",
                as: "transactions",
            },
        },
        {
            $unwind: {
                path: "$transactions",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $group: {
                _id: "$_id",
                isAdmin: { $first: "$isAdmin" },
                username: { $first: "$username" },
                ecoScore: { $first: "$ecoScore" },
                name: { $first: "$name" },
                email: { $first: "$email" },
                profile_pic: { $first: "$profile_pic" },
                rewards: { $first: "$rewards" },
                createdAt: { $first: "$createdAt" },
                updatedAt: { $first: "$updatedAt" },
                transactions: {
                    $push: "$transactions",
                },
            },
        },
        {
            $unwind: {
                path: "$rewards",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $lookup: {
                from: "rewards",
                localField: "rewards.reward_id",
                foreignField: "_id",
                as: "rewards",
            },
        },
        {
            $unwind: {
                path: "$rewards",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $lookup: {
                from: "rewarditems",
                localField: "rewards.item",
                foreignField: "_id",
                as: "rewards.itemData",
            },
        },
        {
            $unwind: {
                path: "$rewards.itemData",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $addFields: {
                "rewards.itemName": "$rewards.itemData.name",
            },
        },
        {
            $unset: "rewards.itemData",
        },
        {
            $group: {
                _id: "$_id",
                isAdmin: { $first: "$isAdmin" },
                username: { $first: "$username" },
                ecoScore: { $first: "$ecoScore" },
                name: { $first: "$name" },
                email: { $first: "$email" },
                profile_pic: { $first: "$profile_pic" },
                transactions: { $first: "$transactions" },
                rewards: {
                    $push: "$rewards",
                },
                createdAt: { $first: "$createdAt" },
                updatedAt: { $first: "$updatedAt" },
            },
        },
    ];

    let userData = (await User.aggregate(userByIdPipeline))[0];

    if(!userData.rewards[0]._id) userData.rewards = [];
    
    return userData;
});

const fetchUserDataByUsername = asyncHandler(async (username) => {
    const userByUsernamePipeline = [
        {
            $match: {
                username: `${username}`,
            },
        },
        {
            $unwind: {
                path: "$transactions",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $lookup: {
                from: "transactions",
                localField: "transactions.transaction_id",
                foreignField: "_id",
                as: "transactions",
            },
        },
        {
            $unwind: {
                path: "$transactions",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $lookup: {
                from: "rewarditems",
                localField: "rewards.item",
                foreignField: "_id",
                as: "rewards.itemData",
            },
        },
        {
            $unwind: {
                path: "$rewards.itemData",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $addFields: {
                "rewards.itemName": "$rewards.itemData.name",
            },
        },
        {
            $unset: "rewards.itemData",
        },
        {
            $group: {
                _id: "$_id",
                isAdmin: { $first: "$isAdmin" },
                username: { $first: "$username" },
                ecoScore: { $first: "$ecoScore" },
                name: { $first: "$name" },
                email: { $first: "$email" },
                profile_pic: { $first: "$profile_pic" },
                rewards: { $first: "$rewards" },
                createdAt: { $first: "$createdAt" },
                updatedAt: { $first: "$updatedAt" },
                transactions: {
                    $push: "$transactions",
                },
            },
        },
        {
            $unwind: {
                path: "$rewards",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $lookup: {
                from: "rewards",
                localField: "rewards.reward_id",
                foreignField: "_id",
                as: "rewards",
            },
        },
        {
            $unwind: {
                path: "$rewards",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $group: {
                _id: "$_id",
                isAdmin: { $first: "$isAdmin" },
                username: { $first: "$username" },
                ecoScore: { $first: "$ecoScore" },
                name: { $first: "$name" },
                email: { $first: "$email" },
                profile_pic: { $first: "$profile_pic" },
                transactions: { $first: "$transactions" },
                rewards: {
                    $push: "$rewards",
                },
                createdAt: { $first: "$createdAt" },
                updatedAt: { $first: "$updatedAt" },
            },
        },
    ];
    
    let userData = (await User.aggregate(userByUsernamePipeline))[0];
    
    if(!userData.rewards[0]._id) userData.rewards = [];

    return userData;
});

exports.checkGetUserByUsername = [
    param("username").custom(async (value, { req }) => {
        const userDoc = await fetchUserDataByUsername(value);
        
        if (!userDoc) {
            throw new ErrorResponse("No Such User Found", 404);
        }
        
        req.userDoc = userDoc;

        return true;
    }),
];

exports.checkGetUserById = [
    param("userId").custom(async (value, { req }) => {
        const userDoc = await fetchUserDataById(value);

        if (!userDoc) {
            throw new ErrorResponse("No Such User Found", 404);
        }

        req.userDoc = userDoc;

        return true;
    }),
];

exports.getLoggedInUserData = asyncHandler(async (req, res) => {
    const userId = req.authUser.staticId;

    const userDoc = await fetchUserDataById(userId);

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
