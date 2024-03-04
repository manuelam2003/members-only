const express = require("express");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const passport = require("passport");

exports.sign_up_get = asyncHandler(async (req, res, next) => {
  res.render("sign_up_form", {
    title: "Sign up form",
  });
});

exports.sign_up_post = [
  body("username")
    .trim()
    .isEmail()
    .escape()
    .withMessage("Not a valid e-mail address")
    .custom(async (value) => {
      const user = await User.findOne({ username: value });
      if (user) {
        throw new Error("E-mail already in use");
      }
    }),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),
  body("confirm_password")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords must match"),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      let username = req.body.username;
      if (errors.array().some((err) => err.msg === "E-mail already in use")) {
        username = null;
      }
      res.render("sign_up_form", {
        title: "Sign Up Form",
        errors: errors.array(),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: username,
      });
    } else {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
          return next(err);
        }
        const user = new User({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          username: req.body.username,
          password: hashedPassword,
        });
        const result = await user.save();
        res.redirect("/");
      });
    }
  }),
];

exports.log_in_get = asyncHandler(async (req, res, next) => {
  res.render("log_in_form");
});

exports.log_in_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/log-in",
});

exports.log_out = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
