const { header } = require("express-validator");
const asyncHandler = require("./asyncHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ErrorResponse = require('../utils/ErrorResponse');
require("dotenv").config();

exports.checkAuthorizationHeaders = [
  header("authorization")
    .exists()
    .withMessage("Unauthorized to Access this Route")
    .bail()
    .isString()
    .withMessage("Unauthorized to Access this Route")
    .bail()
    .custom((value, { req }) => {
      if (!value.startsWith("Bearer ")) {
        return false;
      }
      const access_token = value.split("Bearer ")[1];
      req.access_token = jwt.verify(access_token, process.env.JWT_SECRET);
      if (!req.access_token) {
        throw new ErrorResponse("Session Expired! Please login again", 403);
      }
      return true;
    }),
];

exports.authenticateAdmin = asyncHandler(async (req, res, next) => {
  const user_doc = await User.findOne(
    { _id: req.access_token.id }
  );

  if (!user_doc) {
    throw new ErrorResponse(
      `Oops! Maybe your account disabled or permanently deleted.`,
      403
    );
  }
  
  if(!user_doc.isAdmin){
    throw new ErrorResponse(
      `Oops! You are not an Admin.`,
      401
    )
  }

  req.authUser = {
    staticId: user_doc._id,
    name: user_doc.name,
    isAdmin: user_doc.isAdmin
  };

  next();
});

exports.authenticateUser = asyncHandler(async (req, res, next) => {
  const user_doc = await User.findOne(
    { _id: req.access_token.id },
    { _id: 1, name: 1 }
  );

  if (!user_doc) {
    throw new ErrorResponse(
      `Oops! Maybe your account disabled or permanently deleted.`,
      403
    );
  }

  req.authUser = {
    staticId: user_doc._id,
    name: user_doc.name,
    isAdmin: user_doc.isAdmin
  };

  next();
});