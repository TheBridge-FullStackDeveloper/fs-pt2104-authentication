const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const UserModel = require("../model/User");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const dotenv = require("dotenv").config();
const debug = require("debug")("app:auth");
const GitHubStrategy = require("passport-github2").Strategy;
const authControllers = require("./auth.controller");

const authConfig = {
  usernameField: "email",
  passwordField: "password",
};

const githubConfig = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/github/callback",
};

const JWTconfig = {
  secretOrKey: process.env.SECRET_TOKEN,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken("secret_token"),
};

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  "signup",
  new localStrategy(authConfig, authControllers.signupController)
);

passport.use(
  "login",
  new localStrategy(authConfig, authControllers.loginController)
);

passport.use(new JWTstrategy(JWTconfig, authControllers.JWTcontroller));

passport.use(
  new GitHubStrategy(githubConfig, authControllers.githubController)
);
