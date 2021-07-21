const mongoose = require("mongoose");
const { MONGO_URI } = require("../constants");
const debug = require("debug")("app:database");

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.on("error", (error) => console.log(error));
