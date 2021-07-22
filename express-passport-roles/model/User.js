const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
    minlength: 8,
    maxlength: 16,
    trim: true,
  },
  githubID: {
    type: String, // <-- Now we need a githubID
    unique: true,
  },
  role: {
    type: String,
    enum: ["USER", "EDITOR", "ADMIN"],
    default: "USER",
  },
});

UserSchema.pre("save", async function (next) {
  const user = this;

  if (user.githubID) {
    next();
  }

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  // password viene desde el body
  // user.password es del BBDD
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
