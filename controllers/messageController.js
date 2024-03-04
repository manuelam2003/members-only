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

exports.message_delete = asyncHandler(async (req, res, next) => {
  const message = await Message.findById(req.params.id)
    .populate("author")
    .exec();
  if (message === null) {
    res.redirect("/");
  }
  await Message.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

exports.update_message_get = asyncHandler(async (req, res, next) => {
  const message = await Message.findById(req.params.id).exec();
  if (message === null) {
    const err = new Error("Message not found");
    err.status = 404;
    return next(err);
  }
  res.render("create_message_form", {
    title: "Update message",
    message: message,
  });
});

exports.update_message_post = [
  body("title", "Title must not be empty").trim().isLength({ min: 1 }).escape(),
  body("messageText", "Message must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const message = {
      title: req.body.title,
      text: req.body.messageText,
      author: req.user,
      timestamp: Date.now(),
      _id: req.params.id,
    };
    if (!errors.isEmpty()) {
      res.render("create_message_form", {
        title: "Update message",
        message: message,
        errors: errors.array(),
      });
    } else {
      await Message.findByIdAndUpdate(req.params.id, message, { new: true });
      res.redirect("/");
    }
  }),
];
