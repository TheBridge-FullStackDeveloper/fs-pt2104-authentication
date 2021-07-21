const express = require("express");
const passport = require("passport");
const { loginController } = require("../controllers/auth.controller");
const dotenv = require("dotenv").config();
const secureRoute = require("./secure-routes");
const authRoute = require("./auth-route");
const postRoute = require("./post-route");

const router = express.Router();

router.use("/", authRoute);
router.use("/user", passport.authenticate("jwt", { session: false }), secureRoute);
router.use("/post", passport.authenticate("jwt", { session: false }), postRoute);

module.exports = router;
