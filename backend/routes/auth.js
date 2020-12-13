const express = require("express");
const passport = require("passport");
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res) => {
    res.json({
      message: "Sign up sucessful",
      user: req.user,
    });
  }
);

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error(err);

        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { email: user.email }; // you should really include the user's id here. this is a template.
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET || "TOP_SECRET");

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
