const express = require('express');
const { checkAuthorizationHeaders, authenticateUser } = require('../../middlewares/authenticate');
const { validateRequestBody } = require('../../middlewares/validateRequestBody');
const upload = require('../../config/multerUpload');
const { uploadClothPic, checkUploadClothPic } = require('../../controllers/transaction/upload.js');
const router = express.Router({ mergeParams: true });

router.route('/').post(
    checkAuthorizationHeaders,
    validateRequestBody,
    authenticateUser,

    upload.fields([{ name: "image", maxCount: 1 }]),

    checkUploadClothPic,
    validateRequestBody,

    uploadClothPic
);

module.exports = router;
