const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const logger = require("morgan");
const debug = require("debug")("app");

require("./database");
require("./auth/passport");

const routes = require("./routes/routes");

const app = express();

app.use(logger("dev"));
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", routes);

// Handle errors.
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(3000, () => {
  debug("Server started. 🚀");
});
