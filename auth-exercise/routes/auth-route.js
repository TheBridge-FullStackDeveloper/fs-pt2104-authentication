const express = require("express");
const passport = require("passport");

const { loginController } = require("../controllers/auth.controller");

const router = express.Router();

router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    res.json({
      message: "Signup successful",
      user: req.user,
    });
  }
);

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    loginController(req, res, next, user, err);
  })(req, res, next);
});

router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res, next) {
    try {
      return loginController(req, res, next, req.user, null);
    } catch (error) {
      res.json({ err: error });
    }
  }
);

module.exports = router;
