const express = require("express");
const router = express.Router({ mergeParams: true });
const upload = require("../../config/multerUpload");
const {
    checkAuthorizationHeaders,
    authenticateUser,
    authenticateAdmin,
} = require("../../middlewares/authenticate");
const {
    validateRequestBody,
    checkMongoId,
} = require("../../middlewares/validateRequestBody");
const {
    checkCreateRewardItem,
    CreateRewardItem,
    getAllRewardItems,
    activateRewardItem,
    deactivateRewardItem,
    getRewardItemById
} = require("../../controllers/reward/items");

router.route("/").post(
    checkAuthorizationHeaders,
    validateRequestBody,
    authenticateAdmin,

    upload.fields([{ name: "image", maxCount: 1 }]),

    checkCreateRewardItem,
    validateRequestBody,

    CreateRewardItem
);

router.route("/all").get(getAllRewardItems);

router.route("/activate/:rewardItemId").patch(
    checkAuthorizationHeaders,
    validateRequestBody,
    authenticateAdmin,

    checkMongoId("rewardItemId"),
    validateRequestBody,

    activateRewardItem
);

router.route('/deactivate/:rewardItemId').patch(
    checkAuthorizationHeaders,
    validateRequestBody,
    authenticateAdmin,

    checkMongoId("rewardItemId"),
    validateRequestBody,

    deactivateRewardItem
);

router.route('/id/:rewardItemId').get(
    checkMongoId("rewardItemId"),
    validateRequestBody,

    getRewardItemById
);

module.exports = router;