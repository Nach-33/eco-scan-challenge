const express = require('express');
const { checkAuthorizationHeaders, authenticateUser } = require('../../middlewares/authenticate');
const { validateRequestBody } = require('../../middlewares/validateRequestBody');
const { getLoggedInUserData, checkGetUserByUsername, getUserDataByUsername, getUserDataById, checkGetUserById } = require('../../controllers/user/profile');
const router = express.Router({ mergeParams: true });

router.route('/').get(
    checkAuthorizationHeaders,
    validateRequestBody,
    authenticateUser,

    getLoggedInUserData
)

router.route('/username/:username').get(
    checkGetUserByUsername,
    validateRequestBody,
    
    getUserDataByUsername
)

router.route('/id/:userId').get(
    checkGetUserById,
    validateRequestBody,

    getUserDataById
)

module.exports = router