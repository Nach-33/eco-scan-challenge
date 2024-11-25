const asyncHandler = require("../../middlewares/asyncHandler");
const { fileUpload } = require("../../config/firebaseConfig");
const { classifyImage } = require("../../utils/ImageClassifier");
const User = require("../../models/User");
const Transaction = require("../../models/Transaction");
const { body } = require("express-validator");
const ErrorResponse = require("../../utils/ErrorResponse");
const fs = require("fs");

const getFileExtension = (filename) => {
    return filename.split(".").slice(-1);
};

const downloadFile = (buffer, file_path) => {
    const data = buffer;
    return new Promise((resolve, reject) => {
        fs.writeFile(file_path, data, (err) => {
            if (err) {
                return reject();
            }
            return resolve();
        });
    });
};

const deleteFile = (file_path) => {
    return new Promise((resolve, reject) => {
        fs.unlink(file_path, (err) => {
            if (err) {
                reject();
            }
            return resolve();
        });
    });
};

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

    const imageFileName = `clothImage.${getFileExtension(image.originalname)}`;

    await downloadFile(image.buffer, imageFileName);

    const result = await classifyImage(`./${imageFileName}`);

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

    await deleteFile(`./${imageFileName}`);

    return res.status(200).json({
        message: "Transaction Done Successfully",
        url: imageURL,
        result: result,
    });
});