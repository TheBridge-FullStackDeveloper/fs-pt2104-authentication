const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const UserModel = require("../model/User");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const dotenv = require("dotenv").config();
const GitHubStrategy = require("passport-github2").Strategy;
const passportControllers = require("../controllers/passport.controller");

const localConfig = {
  usernameField: "email",
  passwordField: "password",
};

const JWTConfig = {
  secretOrKey: process.env.TOKEN_SECRET,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken("secret_token"),
};

const githubConfig = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/github/callback",
};

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  "signup",
  new localStrategy(localConfig, passportControllers.passportSignup)
);

passport.use(
  "login",
  new localStrategy(localConfig, passportControllers.passportLogin)
);

passport.use(new JWTstrategy(JWTConfig, passportControllers.passportToken));

passport.use(
  new GitHubStrategy(githubConfig, passportControllers.passportGithub)
);
