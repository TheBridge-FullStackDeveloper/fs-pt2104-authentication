const UserModel = require("../model/User");

const checkRoles = (role) => async (req, res, next) => {
  const user = await UserModel.findById(req.user._id);

  if (user.role === role) {
    return next();
  }

  res.status(403).json({ message: "Not authorized" });
};

module.exports = checkRoles;
