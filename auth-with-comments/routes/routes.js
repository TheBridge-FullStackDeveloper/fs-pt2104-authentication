const express = require("express");
const passport = require("passport");
const { loginController } = require("../controllers/auth.controller");
const dotenv = require("dotenv").config();
const secureRoute = require("./secure-routes");
const authRoute = require("./auth-route");

const router = express.Router();

// Rutas para efectuar acciones de auth
router.use("/", authRoute);

// Rutas a la cual podemos acceder solo si tenemos un JWT
router.use("/user", passport.authenticate("jwt", { session: false }), secureRoute);

module.exports = router;
