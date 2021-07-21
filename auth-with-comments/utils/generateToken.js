const jwt = require("jsonwebtoken");

const { secretToken } = require("../constants");

const EXPIRE_TIME = "3600s";

const generateToken = (req) => {
  // Info que vamos ad añadir en el payload del JWT
  const body = { _id: req.user._id, email: req.user.email };
  // Vamos a crear el TOKEN
  const token = jwt.sign({ user: body }, secretToken, {
    expiresIn: EXPIRE_TIME,
  });

  return token;
};

module.exports = { generateToken };
