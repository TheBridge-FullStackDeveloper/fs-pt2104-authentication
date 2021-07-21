const express = require("express");

const PostModel = require("../model/Post");
const checkRoles = require("../middlewares/checkRoles");
const UserModel = require("../model/User");

const router = express.Router();

router.get("/get-all", async (req, res) => {
  const posts = await PostModel.find({});

  res.status(200).json(posts);
});

router.post("/create", async (req, res) => {
  console.log(req.body);
  const { content } = req.body;
  const { _id } = req.user;

  const post = await PostModel.create({ content, owner: _id });

  res.status(200).json(post);
});

router.put("/edit", async (req, res) => {
  const { id: postId, content } = req.body;
  const { _id } = req.user;

  const post = await PostModel.findById(postId);
  const user = await UserModel.findById(_id);

  const isPostOwner = post.owner.toString() === _id;
  const isAuthorized = ["ADMIN", "EDITOR"].includes(user.role);

  if (!isAuthorized && !isPostOwner) {
    res.status(403).json({ message: "Unauthorized" });
    return;
  }

  const postEdited = await PostModel.findOneAndUpdate(
    { _id: postId },
    { content }
  );

  res.status(200).json(postEdited);
  return;
});

router.delete("/remove/:id", checkRoles("ADMIN"), async (req, res) => {
  const { id } = req.params;

  const postRemoved = await PostModel.findOneAndRemove({ _id: id });

  res.status(200).json(postRemoved);
});

module.exports = router;
