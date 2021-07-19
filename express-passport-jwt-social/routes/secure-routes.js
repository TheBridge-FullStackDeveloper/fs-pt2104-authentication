const express = require("express");
const router = express.Router();
const debug = require('debug')('app:routes:secure-route')

router.get("/profile", (req, res, next) => {
  res.json({
    message: "You made it to the secure route",
    user: req.user,
  });
});

module.exports = router;