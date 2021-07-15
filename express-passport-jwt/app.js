const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const logger = require("morgan");
const debug = require('debug')('app')

mongoose.connect("mongodb://127.0.0.1:27017/passport-jwt", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);
mongoose.connection.on("error", (error) => console.log(error));

require("./auth/auth");

const routes = require("./routes/routes");
const secureRoute = require("./routes/secure-routes");


const app = express();

app.use(logger('dev'));

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
