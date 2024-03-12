const express = require("express");
const router = express.Router();
const authController = require("../Controllers/auth-controller");
// const signupSchema = require("../validators/auth-validator");
// const validate = require("../middlewears/validat-middlewear");

router.route("/").get(authController.home);
router.route("/register").post(authController.register);
router.route("/login").post(authController.login);
router.route("/post/:id").post(authController.post);
router.route("/getUsers").get(authController.getUsers);
router.route("/getUser/:email").get(authController.getUser);
router.route("/dele/:id").delete(authController.deleteUser);
router.route("/update/:id").put(authController.updateUser);

module.exports = router;
