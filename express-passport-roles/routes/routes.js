const express = require("express");
const passport = require("passport");

const secureRoute = require("./secure-routes")
const authRoute = require("./auth-routes")

const router = express.Router();

// Plug in the JWT strategy as a middleware so only verified users can access this route.
router.use("/", authRoute);
router.use("/user", passport.authenticate("jwt", { session: false }), secureRoute);

module.exports = router;
