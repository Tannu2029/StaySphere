const User = require("../models/user");
const crypto = require("crypto");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs"); 
};

module.exports.signup = async (req, res, next) => {
        try {
            let { username, email, password } = req.body;
            const newUser = new User({ email, username });
            const registeredUser = await User.register(newUser, password);
            console.log(registeredUser);

            req.login(registeredUser, (err) => {
                if (err) {
                    return next(err);
                }
                req.flash("success", "Welcome to StaySphere :)");
                return res.redirect("/listings"); 
            });
        } catch (e) {
            req.flash("error", e.message);
            return res.redirect("/signup");
        }
};

module.exports.renderloginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = async(req, res) => {
            req.flash("success", "Welcome back to StaySphere! You're logged in!");
            let redirectUrl = res.locals.redirectUrl || "/listings";
            res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "You are logged out!");
        res.redirect("/listings");
    });
};

// 1. Render Forgot Password Form
module.exports.renderForgotPasswordForm = (req, res) => {
  res.render("users/forgot_password.ejs");
};

// 2. Check email and redirect directly to reset form
module.exports.sendResetToken = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    req.flash("error", "No account with that email address exists.");
    return res.redirect("/forgot_password");
  }

  // Seedha reset password page pe le jao, user ki id ke saath
  res.redirect(`/reset_password/${user._id}`);
};

// 3. Render Reset Password Form
module.exports.renderResetPasswordForm = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    req.flash("error", "Invalid request.");
    return res.redirect("/forgot_password");
  }

  res.render("users/reset_password.ejs", { userId: id });
};

// 4. Save New Password
module.exports.resetPassword = async (req, res) => {
  const { id } = req.params;
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    req.flash("error", "Passwords do not match.");
    return res.redirect(`/reset_password/${id}`);
  }

  const user = await User.findById(id);
  if (!user) {
    req.flash("error", "Invalid request.");
    return res.redirect("/forgot_password");
  }

  await user.setPassword(password);
  await user.save();

  req.flash("success", "Password changed successfully! Please login.");
  res.redirect("/login");
};