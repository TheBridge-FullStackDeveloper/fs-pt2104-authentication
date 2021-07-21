const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  content: {
    type: String,
    required: true,
    unique: true,
  },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

const PostModel = mongoose.model("Posts", PostSchema);

module.exports = PostModel;