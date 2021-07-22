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
  },
  githubID: {
    type: String,
  },
  role: {
    type: String,
    enum: ["USER", "EDITOR", "ADMIN"],
    default: "USER",
  },
});

/**
 * Esta funcion es llamada antes de guardar el usuario
 * y es aqui donde hacemos el hash de la password
 * 🎥 https://drive.google.com/file/d/1AzeZ8NPCx-qxPJYrFO6DsXtjqxwAd98V/view?t=40m29s
 */
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

/**
 * Esta funcion la utilizamos para comparar la password que llega desde el front
 * con la password que tenemos en la BBDD
 */
UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
