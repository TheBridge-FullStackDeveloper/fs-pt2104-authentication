const dotenv = require("dotenv").config();

module.exports = {
  MONGO_URI: "mongodb://127.0.0.1:27017/auth-exercise",
  PORT: 3000,
  secretToken: process.env.SECRET_TOKEN || 'SECRET'
}