const express = require("express");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Message = require("../models/message");

exports.create_message_get = (req, res, next) => {
  res.render("create_message_form", {
    title: "Create message",
    errors: [],
  });
};

exports.create_message_post = [
  body("title", "Title must not be empty").trim().isLength({ min: 1 }).escape(),
  body("messageText", "Message must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const message = new Message({
      title: req.body.title,
      text: req.body.messageText,
      author: req.user,
    });
    console.log(message);
    if (!errors.isEmpty()) {
      res.render("create_message_form", {
        title: "Create message",
        message: message,
        errors: errors.array(),
      });
    } else {
      await message.save();
      res.redirect("/");
    }
  }),
];
