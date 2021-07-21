const express = require("express");
const checkRoles = require("../middlewares/checkRoles");
const UserModel = require("../model/User");
const router = express.Router();
const debug = require("debug")("app:routes:secure-route");

const userController = require("../controllers/user.controller");

/** 
* Rutas segura en la cual pueden entrar usuarios connectados 
*/
router.get("/profile", userController.profileController);

/** 
 * Rutas segura en la cual pueden entrar usuarios connectados y ademas controla
 * si el usuario puede efectuar esta operacion
*/
router.put("/modify", checkRoles("ADMIN"), userController.modifyController);

module.exports = router;
