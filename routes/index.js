const express = require("express");
const router = express.Router();
const auth_controller = require("../controllers/authController");
const user_controller = require("../controllers/userController");
const message_controller = require("../controllers/messageController");
const asyncHandler = require("express-async-handler");
const Message = require("../models/message");
const User = require("../models/user");

// middleware to check if user is logged in
function isLoggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect("/log-in");
  }
}

// check if user is admin
function isAdmin(req, res, next) {
  if (req.user.is_admin) {
    next();
  } else {
    res.redirect("/become-admin");
  }
}

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const allMessages = await Message.find()
      .sort({ timestamp: -1 })
      .populate("author")
      .exec();
    res.render("index", { title: "Express1", messages: allMessages });
  })
);

router.get(
  "/users",
  asyncHandler(async (req, res, next) => {
    const allUsers = await User.find().exec();
    res.render("user_table", { users: allUsers });
  })
);

/// AUTH CONTROLLER ROUTES

router.get("/sign-up", auth_controller.sign_up_get);

router.post("/sign-up", auth_controller.sign_up_post);

router.post("/log-in", auth_controller.log_in_post);

router.get("/log-in", auth_controller.log_in_get);

router.get("/log-out", auth_controller.log_out);

/// USER CONTROLLER ROUTES

router.get("/become-member", isLoggedIn, user_controller.become_member_get);

router.post("/become-member", isLoggedIn, user_controller.become_member_post);

router.get("/become-admin", isLoggedIn, user_controller.become_admin_get);

router.post("/become-admin", isLoggedIn, user_controller.become_admin_post);

/// MESSAGE CONTROLLER ROUTES

router.get(
  "/create-message",
  isLoggedIn,
  message_controller.create_message_get
);

router.post(
  "/create-message",
  isLoggedIn,
  message_controller.create_message_post
);

router.get(
  "/delete-message/:id",
  isLoggedIn,
  message_controller.message_delete
);

router.get(
  "/update-message/:id",
  isLoggedIn,
  message_controller.update_message_get
);

router.post(
  "/update-message/:id",
  isLoggedIn,
  message_controller.update_message_post
);

module.exports = router;
