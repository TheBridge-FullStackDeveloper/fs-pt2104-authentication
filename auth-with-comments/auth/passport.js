const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const UserModel = require("../model/User");
const JWTstrategy = require("passport-jwt").Strategy;
const dotenv = require("dotenv").config();
const debug = require("debug")("app:auth");
const GitHubStrategy = require("passport-github2").Strategy;
const authControllers = require("../controllers/passport.controller");
const {
  authConfig,
  JWTconfig,
  githubConfig,
} = require("../config/auth.config");

/**
 * Función utilizada para serializar objetos de usuario en la sesión.
 * 
 * Major informacion: https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize/27637668#27637668
 *
 * Examples:
 *
 *     passport.serializeUser(function(user, done) {
 *       done(null, user.id);
 *     });
 */
 passport.serializeUser(function (user, done) {
  done(null, user);
});

/**
 * función utilizada para deserializar objetos de usuario fuera de la sesión.
 * 
 * Major informacion: https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize/27637668#27637668
 *
 * Examples:
 *
 *     passport.serializeUser(function(user, done) {
 *       done(null, user.id);
 *     });
 */
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

/**
 * Creamos nuestra `estrategia` con el` nombre` opcional
 * Para ver como funciona por dentro: https://github.com/jaredhanson/passport/blob/b220766870/lib/authenticator.js#L51
 *
 * Examples:
 *
 *     passport.use(new TwitterStrategy(...));
 *
 *     passport.use('api', new http.BasicStrategy(...));
 */

// Middleware con estrategia para el signup (momento de registracion)
// 🎥 https://drive.google.com/file/d/1AzeZ8NPCx-qxPJYrFO6DsXtjqxwAd98V/view?t=46m35s
passport.use("signup", new localStrategy(authConfig, authControllers.passportSignupController));

// Middleware con estrategia para el login (momento de ecceder a la aplicacion con registro ya hecho)
// 🎥 https://drive.google.com/file/d/1QRwRIO6rzcxS5a4UIw95-1HaOMtjyhqw/view?t=3m45s
passport.use("login", new localStrategy(authConfig, authControllers.passportLoginController));

// Middleware con Estrategia para controlar si el JWT es valido

// 🎥 https://drive.google.com/file/d/1QRwRIO6rzcxS5a4UIw95-1HaOMtjyhqw/view?t=41m43s
passport.use(new JWTstrategy(JWTconfig, authControllers.passportJWTcontroller));

// Middleware con Estrategia para social login con github

// 🎥 https://drive.google.com/file/d/1iwVPeH-VLi_mc6_qIL5M_Pzme6mSasje/view
passport.use(new GitHubStrategy(githubConfig, authControllers.passportGithubController));
