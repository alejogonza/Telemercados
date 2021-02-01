const jwt = require("jsonwebtoken");
require('dotenv').config();

// User model
const User = require("../models/User");

async function verifytoken(req, res, next) {
  try {
    //token validator
    const token = req.headers["token"];

    if (!token) {
      return res.status(401).json({
        message: "Token not found",
        auth: false,
        success: false,
      });
    }

    //decode and search user
    const decoded = jwt.verify(token, process.env.JWTSECRET);

    req.userId = decoded.id;

    var user = await User.findById(req.userId, {});

    if (user == null) {
      return res.status(401).json({
        message: "Token not valid",
        auth: false,
        success: false,
      });
    }
  } catch (error) {
    if (error.name == "CastError") {
      return res.status(400).json({
        message: "User not found",
        auth: false,
        success: false,
        error: error,
      });
    }

    if (error.name == "JsonWebTokenError") {
      return res.status(400).json({
        message: "Invalid token",
        auth: false,
        success: false,
        error: error,
      });
    }

    return res.status(500).json({
      message: "Internal server error 500",
      auth: false,
      success: false,
      error: error,
    });
  }
  next();
}

module.exports = verifytoken;
