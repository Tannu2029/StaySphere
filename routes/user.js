const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

router
    .route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signup));

router.route("/login")
    .get(userController.renderloginForm)
    .post(
        saveRedirectUrl,
        passport.authenticate("local", {
            failureRedirect: "/login",
            failureFlash: true,
        }),
        userController.login
    );

router.get("/logout", userController.logout);

router.route("/forgot_password")
    .get(userController.renderForgotPasswordForm)
    .post(wrapAsync(userController.sendResetToken));

router.route("/reset_password/:id")
    .get(wrapAsync(userController.renderResetPasswordForm))
    .post(wrapAsync(userController.resetPassword));

module.exports = router;