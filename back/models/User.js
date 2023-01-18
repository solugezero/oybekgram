const { Schema, model } = require("mongoose");

const User = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  nickname: { type: String },
  description: { type: String },
  posts: [{ type: Array, ref: "Post" }],
  followers: [{ type: Object, ref: "User" }],
  following: [{ type: Object, ref: "User" }],
  avatar: {
    type: String,
    default:
      "https://cdn.iz.ru/sites/default/files/styles/900x506/public/news-2019-12/inx960x640.jpg?itok=XE_45HXo",
  },
});

module.exports = model("User", User);
