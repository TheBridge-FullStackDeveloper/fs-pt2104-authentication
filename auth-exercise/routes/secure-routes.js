const express = require("express");
const checkRoles = require("../middlewares/checkRoles");
const UserModel = require("../model/User");
const router = express.Router();
const debug = require("debug")("app:routes:secure-route");

router.get("/profile", (req, res, next) => {
  res.json({
    message: "You made it to the secure route",
    user: req.user,
  });
});

router.put("/modify", checkRoles("ADMIN"), async (req, res) => {
  const { id, email } = req.body;

  const userModified = await UserModel.findOneAndUpdate({ _id: id }, { email });

  if(!userModified) {
    res.status(200).json({ message: "User to modify not found" });
  }

  res.status(200).json({ message: "Modified correctly" });
});

module.exports = router;
