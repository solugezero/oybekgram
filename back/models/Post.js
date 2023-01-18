const { Schema, model } = require("mongoose");

const Post = new Schema({
  image: { type: String, required: true },
  owner: { type: String, ref: "User" },
  description: { type: String },
  likes: [{ type: Object, ref: "User" }],
  originalName: { type: String },
});

module.exports = model("Post", Post);
