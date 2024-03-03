const express = require("express");
const router = express.Router();
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

const MEMBER_PASSWORD = "sermiembro";

exports.become_member_get = asyncHandler(async (req, res, next) => {
  res.render("become_member_form", {
    title: "Become a member",
    user: res.locals.currentUser,
  });
});

exports.become_member_post = asyncHandler(async (req, res, next) => {
  const password = req.body.password;
  if (password !== MEMBER_PASSWORD) {
    res.render("become_member_form", {
      title: "Become a member",
      errors: ["wrong password"],
    });
  } else {
    User.findByIdAndUpdate(req.user._id, { membership_status: true })
      .then((result) => {
        res.redirect("/");
      })
      .catch((err) => {
        next(err);
      });
  }
});
