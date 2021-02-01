const express = require("express");
const router = express.Router();
require("dotenv").config();
const DataValidator = require("../helpers/DataValidator");


// JWT
const jwt = require("jsonwebtoken");

// User model
const User = require("../models/User");

router.post("/register", DataValidator, async (req, res) => {
  try {
    const body = {
      email: req.body.email,
      password: req.body.password,
      username: req.body.username
    };
    const bodyValidator = (body) => {
      try {
        bodyErr = [];
        for (const key in body) {
          if (body[key] == undefined) {
            bodyErr.push({
              message: `missing ${key} parameter`,
              error: { param: key },
            });
          }
        }
        if (bodyErr.length == 0) {
          return true;
        } else {
          return res.status(400).json({
            message: `missing parameters`,
            errors: bodyErr,
          });
        }
      } catch (err) {
        return res.status(500).json({
          message: "Internal server error 500",
          error: err,
        });
      }
    };
    if (bodyValidator(body) == true) {
      const emailUser = await User.findOne({ email: body.email });
      if (emailUser != null) {
        return res.status(401).json({
          message: "Email already registered",
          error: {
            param: "email",
            value: body.email,
          },
        });
      }

      const usernameUser = await User.findOne({ username: body.username });
      if (usernameUser != null) {
        return res.status(401).json({
          message: "Username already registered",
          error: {
            param: "username",
            value: body.username,
          },
        });
      }

      const newUser = new User({
        email: body.email,
        password: body.password,
        username: body.username
      });

      newUser.password = await newUser.encryptPassword(body.password);
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWTSECRET, {});

      return res.status(200).json({
        message: "You have successfully registered",
        valid: true,
        auth: true,
        token: token,
        user: newUser,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error 500",
      error: err,
    });
  }
});

router.post("/login", DataValidator, async (req, res) => {
  try {
    const body = {
      email: req.body.email,
      password: req.body.password,
    };
    const bodyValidator = (body) => {
      try {
        bodyErr = [];
        for (const key in body) {
          if (body[key] == undefined) {
            bodyErr.push({
              message: `missing ${key} parameter`,
              error: { param: key },
            });
          }
        }
        if (bodyErr.length == 0) {
          return true;
        } else {
          return res.status(400).json({
            message: `missing parameters`,
            errors: bodyErr,
          });
        }
      } catch (err) {
        return res.status(500).json({
          message: "Internal server error 500",
          error: err,
        });
      }
    };
    if (bodyValidator(body) == true) {
      const emailUser = await User.findOne({ email: body.email });
      if (emailUser == null) {
        return res.status(401).json({
          message: "Email is not registered",
          error: {
            param: "email",
            value: body.email,
          },
        });
      }
      const matchpass = await emailUser.matchPassword(body.password);

      if (!matchpass) {
        return res.status(401).json({
          message: "Incorrect password",
          error: {
            param: "password",
            value: body.password,
          },
        });
      } else {
        const token = jwt.sign(
          { id: emailUser._id },
          process.env.JWTSECRET,
          {}
        );

        return res.status(200).json({
          message: "You have successfully logged",
          valid: true,
          auth: true,
          token: token,
          user: emailUser,
        });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error 500",
      error: err,
    });
  }
});

router.post("/username-validate", async (req, res) => {
  try {
    const { username } = req.body;

    //non-repeated email validator
    const usernameValidator = await User.findOne({ username: username });

    if (usernameValidator != null) {
      return res.status(400).json({
        message: "username already registered",
        success: false,
      });
    } else {
      return res.status(200).json({
        message: "username available",
        success: true,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error 500",
      error: err,
    });
  }
});

router.post("/email-validate", async (req, res) => {
  try {
    const { email } = req.body;

    //non-repeated email validator
    const emailValidator = await User.findOne({ email: email });

    if (emailValidator != null) {
      return res.status(400).json({
        message: "email already registered",
        success: false,
      });
    } else {
      return res.status(200).json({
        message: "email available",
        success: true,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error 500",
      error: err,
    });
  }
});
module.exports = router;
