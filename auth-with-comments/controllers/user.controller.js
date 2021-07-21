const profileController = (req, res, next) => {
  res.json({
    message: "You made it to the secure route",
    user: req.user,
  });
};

const modifyController = async (req, res) => {
  const { id, email } = req.body;

  const userModified = await UserModel.findOneAndUpdate({ _id: id }, { email });

  if(!userModified) {
    res.status(200).json({ message: "User to modify not found" });
  }

  res.status(200).json({ message: "Modified correctly" });
}

module.exports = { profileController, modifyController };
