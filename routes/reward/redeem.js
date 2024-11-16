const express = require("express");
const router = express.Router({ mergeParams: true });
const {
    checkAuthorizationHeaders,
    authenticateUser,
    authenticateAdmin,
} = require("../../middlewares/authenticate");
const {
    validateRequestBody,
    checkMongoId,
} = require("../../middlewares/validateRequestBody");
const { redeemRewardItem, validateRedeemReward } = require("../../controllers/reward/redeem");

router.route("/:rewardItemId").get(
    checkAuthorizationHeaders,
    validateRequestBody,
    authenticateUser,

    checkMongoId("rewardItemId"),
    validateRequestBody,

    validateRedeemReward,

    redeemRewardItem
);

module.exports = router;
