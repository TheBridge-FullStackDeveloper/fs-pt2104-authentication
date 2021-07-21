const UserModel = require("../model/User");

// 🎥 https://drive.google.com/file/d/11IC-mqLdg2jWaeKu5N3GAdJ_HDXapGfr/view?t=18m39s

const checkRoles = (role) => async (req, res, next) => {
  const user = await UserModel.findById(req.user._id);

  if (user.role === role) {
    return next();
  }

  res.status(403).json({ message: "Not authorized" });
};

module.exports = checkRoles;
