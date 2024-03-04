const express = require("express");
const router = express.Router();
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

const MEMBER_PASSWORD = "sermiembro";
const ADMIN_PASSWORD = "seradmin";

exports.become_member_get = (req, res, next) => {
  res.render("become_member_form", {
    title: "Become a member",
  });
};

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

exports.become_admin_get = (req, res, next) => {
  res.render("become_admin_form", { title: "Become an admin" });
};

exports.become_admin_post = asyncHandler(async (req, res, next) => {
  const password = req.body.password;
  if (password !== ADMIN_PASSWORD) {
    res.render("become_admin_form", {
      title: "Become a member",
      errors: ["wrong password"],
    });
  } else {
    User.findByIdAndUpdate(req.user._id, { is_admin: true })
      .then((result) => {
        res.redirect("/");
      })
      .catch((err) => {
        next(err);
      });
  }
});
