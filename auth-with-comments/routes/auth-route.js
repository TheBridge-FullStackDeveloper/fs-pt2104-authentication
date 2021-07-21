const express = require("express");
const passport = require("passport");
const { secretToken } = require("../constants");
const authController = require("../controllers/auth.controller");

const router = express.Router();
/**
 * Aplica la estrategia (o estrategias) con `name` a la request entrante,
 * para autenticar la request. Si la autenticación es exitosa, el usuario
 * iniciará sesión y se completará en `req.user` y se iniciará una sesión será
 * establecido por defecto en req.session. Si la autenticación falla, una error
 * será enviado.
 * 
 * Options:
 *   - `session` en este caso esta a false porque nosotros no queremos utilizar session
 */
// 🎥 https://drive.google.com/file/d/1AzeZ8NPCx-qxPJYrFO6DsXtjqxwAd98V/view?t=53m08s
router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  authController.signUpController,
);

/**
* Se puede proporcionar un callback opcional (el loginController) para permitir que la aplicación anule
* la forma predeterminada en que se gestionan los intentos de autenticación. La
* la devolución de llamada tiene la siguiente forma, donde `user` se establecerá en el
* usuario autenticado en un intento de autenticación exitoso, o "falso"
* de lo contrario. Se pasará un argumento opcional `info`, que contiene
* detalles proporcionados por la devolución de llamada de verificación de la estrategia; esto podría ser información sobre
* una autenticación exitosa o un mensaje para una autenticación fallida.
* Se pasará un argumento de estado opcional cuando falle la autenticación; esto podría
* ser un código de respuesta HTTP para una falla de autenticación remota o similar.
*
* Si se proporciona una devolución de llamada, se convierte en la aplicación
* responsabilidad de iniciar sesión como usuario, establecer una sesión y realizar de otro modo
* las operaciones deseadas. Que en el nuestro caso es crear un JWT
*/

// 🎥 https://drive.google.com/file/d/1QRwRIO6rzcxS5a4UIw95-1HaOMtjyhqw/view?t=23m24s
router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    authController.loginController(req, res, next, user, err);
  })(req, res, next);
});

/**
 * Ruta para poder acceder al login de github
 */

// 🎥 https://drive.google.com/file/d/1iwVPeH-VLi_mc6_qIL5M_Pzme6mSasje/view?t=20m59s
router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

/**
 * Ruta creada para poder gestionar al redireccion de github desde la pagina de login
 */

// 🎥 https://drive.google.com/file/d/1iwVPeH-VLi_mc6_qIL5M_Pzme6mSasje/view?t=30m56s
router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  authController.githubController,
);

module.exports = router;
