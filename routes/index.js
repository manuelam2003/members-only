const express = require("express");
const router = express.Router();
const auth_controller = require("../controllers/authController");
const user_controller = require("../controllers/userController");
const message_controller = require("../controllers/messageController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express1" });
});

router.get("/sign-up", auth_controller.sign_up_get);

router.post("/sign-up", auth_controller.sign_up_post);

router.get("/become-member", user_controller.become_member_get);

router.post("/become-member", user_controller.become_member_post);

router.get("/log-in", auth_controller.log_in_get);

router.post("/log-in", auth_controller.log_in_post);

router.get("/log-out", auth_controller.log_out);

module.exports = router;
