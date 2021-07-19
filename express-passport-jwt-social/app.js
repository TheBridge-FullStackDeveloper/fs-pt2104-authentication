const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const logger = require("morgan");
const debug = require("debug")("app");

require("./database");
require("./auth/auth");

const routes = require("./routes/routes");
const secureRoute = require("./routes/secure-routes");

const app = express();

app.use(logger("dev"));
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", routes);
// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use("/user", passport.authenticate("jwt", { session: false }), secureRoute);

// Handle errors.
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(3000, () => {
  debug("Server started. 🚀");
});
