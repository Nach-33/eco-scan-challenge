const asyncHandler = require("../../middlewares/asyncHandler");
const Reward = require("../../models/Reward");
const RewardItem = require("../../models/RewardItem");
const User = require("../../models/User");
const ErrorResponse = require("../../utils/ErrorResponse");

exports.validateRedeemReward = asyncHandler(async (req, res, next) => {
    const userId = req.authUser.staticId;
    const userDoc = await User.findById(userId);
    const { rewardItemId } = req.params;
    const rewardItem = await RewardItem.findById(rewardItemId);
    const { cost } = rewardItem;

    req.cost = cost;
    req.userEcoScore = userDoc.ecoScore;

    if (!rewardItem.isActive) {
        throw new ErrorResponse("No Such Reward Exists");
    }

    if (userDoc.ecoScore < cost) {
        throw new ErrorResponse("User Does Not Have Enough Eco Score To Redeem This Reward", 400);
    }

    next();
});

exports.redeemRewardItem = asyncHandler(async (req, res) => {
    const userId = req.authUser.staticId;
    const { rewardItemId } = req.params;
    const { cost, userEcoScore } = req;

    const newRewardDoc = await Reward.create({
        userId: userId,
        item: rewardItemId,
        cost: cost,
    });

    const updatedUserDoc = await User.findByIdAndUpdate(userId, {
        $set: {
            ecoScore: userEcoScore - cost,
        },
        $push: {
            rewards: {
                reward_id: newRewardDoc._id,
            },
        },
    });

    res.status(200).json({
        message: "Reward Redeemed Successfully",
        reward: newRewardDoc,
    });
});
