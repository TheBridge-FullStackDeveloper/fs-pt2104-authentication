const mongoose = require("mongoose");
const { MONGO_URI } = require("../constants");

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);
mongoose.connection.on("error", (error) => console.log(error));
