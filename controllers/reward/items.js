const Reward = require("../../models/Reward");
const RewardItem = require("../../models/RewardItem");
const asyncHandler = require("../../middlewares/asyncHandler");
const ErrorResponse = require("../../utils/ErrorResponse");
const { body } = require("express-validator");
const { fileUpload } = require("../../config/firebaseConfig");

const getFileExtension = (filename) => {
    return filename.split(".").slice(-1);
};

const getImageTitle = (name, imageName) => {
    return name.split(" ").join("-") + "." + getFileExtension(imageName);
};

exports.checkCreateRewardItem = [
    body("name")
        .exists()
        .withMessage("Reward Item Must Have A Name")
        .bail()
        .custom(async (value, { req }) => {
            const rewardItemExists = await RewardItem.findOne({ name: value });
            if (rewardItemExists)
                throw new ErrorResponse("Reward Item Already Exists", 400);
            return true;
        }),
    body("cost")
        .exists()
        .withMessage("Reward Item Must Have A Cost")
        .bail()
        .isNumeric()
        .withMessage("Cost Must Be A Number")
        .bail(),
    body().custom((value, { req }) => {
        if (!req.files?.image?.length) {
            throw new ErrorResponse("Reward Item Image is Required", 400);
        }
        return true;
    }),
];

exports.CreateRewardItem = asyncHandler(async (req, res) => {
    const { name, cost } = req.body;
    const image = req.files.image[0];
    const imageTitle = getImageTitle(name, image.originalname);
    const imageURL = fileUpload(image, imageTitle);

    const newRewardItem = await RewardItem.create({
        name: name,
        cost: cost,
        image: imageURL,
    });

    res.status(200).json({
        message: "Reward Item Created Successfully",
        rewardItem: newRewardItem,
    });
});

exports.getAllRewardItems = asyncHandler(async (req, res) => {
    const rewardItemsList = await RewardItem.find({isActive: true});

    return res.status(200).json({
        message: "Reward Items List Fetched Successfully",
        rewardItemsList: rewardItemsList,
    });
});

exports.activateRewardItem = asyncHandler(async (req, res) => {
    const { rewardItemId } = req.params;

    const activatedRewardItem = await RewardItem.findByIdAndUpdate(
        rewardItemId,
        {
            isActive: true,
        }
    );

    return res.status(200).json({
        message: "Reward Item Activated Successfully",
    });
});

exports.deactivateRewardItem = asyncHandler(async (req, res) => {
    const { rewardItemId } = req.params;

    const deactivatedRewardItem = await RewardItem.findByIdAndUpdate(
        rewardItemId,
        {
            isActive: false,
        }
    );

    return res.status(200).json({
        message: "Reward Item Deactivated Successfully",
    });
});

exports.getRewardItemById = asyncHandler(async (req, res) => {
    const { rewardItemId } = req.params;

    const rewardItem = await RewardItem.findById(rewardItemId);

    return res.status(200).json({
        message: "Reward Item Fetched Successfully",
        rewardItem: rewardItem
    })
});
