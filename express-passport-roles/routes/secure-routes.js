const express = require("express");
const checkRoles = require("../middleware/checkRoles");
const router = express.Router();
const debug = require("debug")("app:routes:secure-route");

const UserModel = require("../model/User");

router.get("/profile", (req, res, next) => {
  debug(req.user);
  res.json({
    message: "You made it to the secure route",
    user: req.user,
    token: req.query.secret_token,
  });
});

router.get("/get-all", async (req, res, next) => {
  try {
    const users = await UserModel.find({});

    if (!users) {
      res.status(200).json({ message: "No users" });
    }

    res.status(200).json({ users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
});

router.put("/modify", checkRoles(["ADMIN", "EDITOR"]), async (req, res) => {
  const { id, email } = req.body;

  const userModified = await UserModel.findOneAndUpdate({ _id: id }, { email });

  if (!userModified) {
    res.status(200).json({ message: "User to modify not found" });
    return;
  }

  res.status(200).json({ message: "Modified correctly" });
});

router.delete("/remove/:id", checkRoles(["ADMIN"]), async (req, res) => {
  const { id } = req.params;

  const userDeleted = await UserModel.findOneAndDelete({ _id: id });

  if (!userDeleted) {
    res.status(200).json({ message: "User to delete not found" });
    return;
  }

  res.status(200).json({ message: "Deleted correctly" });
});

module.exports = router;
