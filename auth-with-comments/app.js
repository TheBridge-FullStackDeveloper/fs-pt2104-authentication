const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const logger = require("morgan");
const debug = require("debug")("app");

const routes = require("./routes/routes");
const { PORT } = require("./constants");

require("./database");
require("./auth/passport");

const app = express();

/**
* Este middleware sirve para mostrarnos en la terminal las rutas que han sido llamadas
* eg. POST /login 200 14.077 ms - 145
*/
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
/**
 * Inicializa Passport para solicitudes entrantes, lo que permite estrategias de autenticación de ser aplicadas.
 */
app.use(passport.initialize());
/**
 * Devuelve middleware que solo analiza json y solo mira las solicitudes donde el encabezado Content-Type coincide con la opción de tipo.
 */
app.use(express.json());

/**
 * Middleware donde vamos a declarar dodas nuestras rutas
 */
app.use("/", routes);

// Handle errors.
app.use(function (err, req, res, next) {
  debug(err);
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.listen(PORT, () => {
  debug(`Server started on port ${PORT} 🚀`);
});
