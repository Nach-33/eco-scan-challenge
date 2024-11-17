const asyncHandler = require("../../middlewares/asyncHandler");
const { fileUpload } = require("../../config/firebaseConfig");
const { classifyImage } = require("../../utils/ImageClassifier");
const User = require("../../models/User");
const Transaction = require("../../models/Transaction");
const { body } = require("express-validator");

exports.checkUploadClothPic = [
    body().custom((value, { req }) => {
        if (!req.files?.image?.length) {
            throw new ErrorResponse("Cloth Item Image is Required", 400);
        }
        return true;
    }),
]

exports.uploadClothPic = asyncHandler(async (req, res) => {
    const userId = req.authUser.staticId;
    const image = req.files.image[0];
    const imageTitle = Date.now() + image.originalname;

    const imageURL = await fileUpload(image, imageTitle);

    const result = await classifyImage(imageURL);

    const newTransaction = await Transaction.create({
        userId: userId,
        clothing: result.item,
        carbonScore: result.score
    })

    const updatedUserDoc = await User.findByIdAndUpdate(userId, {
        $inc: {
            ecoScore: result.score
        },
        $push: {
            transactions: {
                transaction_id: newTransaction._id
            }
        }
    });

    res.status(200).json({
        message: "Transaction Done Successfully",
        url: imageURL,
        result: result,
    });
});
