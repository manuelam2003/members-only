const express = require("express");
const router = express.Router();
const auth_controller = require("../controllers/authController");
const user_controller = require("../controllers/userController");
const message_controller = require("../controllers/messageController");
const asyncHandler = require("express-async-handler");
const Message = require("../models/message");
const User = require("../models/user");

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const messages = await Message.find()
      .sort({ timestamp: -1 })
      .populate("author")
      .exec();
    res.render("index", { title: "Express1", messages: messages });
  })
);

router.get(
  "/users",
  asyncHandler(async (req, res, next) => {
    const users = await User.find().exec();
    res.render("user_table", { users: users });
  })
);

router.get("/sign-up", auth_controller.sign_up_get);

router.post("/sign-up", auth_controller.sign_up_post);

router.get("/become-member", user_controller.become_member_get);

router.post("/become-member", user_controller.become_member_post);

router.get("/become-admin", user_controller.become_admin_get);

router.post("/become-admin", user_controller.become_admin_post);

router.get("/log-in", auth_controller.log_in_get);

router.post("/log-in", auth_controller.log_in_post);

router.get("/log-out", auth_controller.log_out);

router.get("/create-message", message_controller.create_message_get);

router.post("/create-message", message_controller.create_message_post);

router.get("/delete-message/:id", message_controller.message_delete);

router.get("/update-message/:id", message_controller.update_message_get);

router.post("/update-message/:id", message_controller.update_message_post);

module.exports = router;
