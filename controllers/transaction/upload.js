const asyncHandler = require("../../middlewares/asyncHandler");
const { fileUpload } = require("../../config/firebaseConfig");
const { classifyImage } = require("../../utils/ImageClassifier");
const User = require("../../models/User");
const Transaction = require("../../models/Transaction");
const { body } = require("express-validator");
const ErrorResponse = require("../../utils/ErrorResponse");
const axios = require("axios");

async function checkFileAvailability(url) {
    const maxRetries = 10; // Adjust the maximum number of retries as needed
    const retryInterval = 300; // Adjust the retry interval in milliseconds

    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await axios.get(url);
            if (response.status === 200) {
                return true; // File is available
            }
        } catch (error) {
            console.error(`Error checking file availability: ${error.message}`);
        }

        await new Promise((resolve) => setTimeout(resolve, retryInterval));
    }

    return false;
}

exports.checkUploadClothPic = [
    body().custom((value, { req }) => {
        if (!req.files?.image?.length) {
            throw new ErrorResponse("Cloth Item Image is Required", 400);
        }
        return true;
    }),
];

exports.uploadClothPic = asyncHandler(async (req, res) => {
    const userId = req.authUser.staticId;
    const image = req.files.image[0];
    const imageTitle = Date.now() + image.originalname;

    const imageURL = fileUpload(image, imageTitle);

    const isAvailable = await checkFileAvailability(imageURL);

    if (isAvailable) {
        const result = await classifyImage(imageURL);

        const newTransaction = await Transaction.create({
            userId: userId,
            clothing: result.item,
            image: imageURL,
            carbonScore: result.score,
        });

        const updatedUserDoc = await User.findByIdAndUpdate(userId, {
            $inc: {
                ecoScore: result.score,
            },
            $push: {
                transactions: {
                    transaction_id: newTransaction._id,
                },
            },
        });

        return res.status(200).json({
            message: "Transaction Done Successfully",
            url: imageURL,
            result: result,
        });
    }

    throw new ErrorResponse("Image File Not Uploaded Successfully");
});
