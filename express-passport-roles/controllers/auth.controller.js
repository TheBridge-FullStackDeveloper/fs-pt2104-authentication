const jwt = require("jsonwebtoken");

const loginController = (req, res, next, user, err) => {
  if (err || !user) {
    const error = new Error("An error occurred.");

    return next(error);
  }

  req.login(user, { session: false }, async (error) => {
    if (error) return next(error);

    const body = { _id: user._id, email: user.email };
    const token = jwt.sign({ user: body }, process.env.TOKEN_SECRET, {
      expiresIn: "3600s",
    });

    return res.json({ token });
  });
};

module.exports = {
  loginController
}
