const express = require("express");
const router = express.Router();
const auth_controller = require("../controllers/authController");
const user_controller = require("../controllers/authController");
const message_controller = require("../controllers/messageController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/sign-up", auth_controller.sign_up_get);

router.post("/sign-up", auth_controller.sign_up_post);

module.exports = router;
