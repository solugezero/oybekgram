const User = require("../models/User");
const Post = require("../models/Post");
const fileUpload = require("express-fileupload");
const { uuid } = require("uuidv4");

class authController {
  async createNewPost(req, res) {
    try {
      let uploadedFile;
      let uploadPath;

      if (!req.files || Object.keys(req.files) === 0) {
        return res.status(400).json({ message: "No files were uploaded" });
      }
      uploadedFile = req.files.uploadedFile;
      let hashedName = uuid();
      let ex = uploadedFile.name.split(".").reverse()[0];
      uploadPath =
        __dirname +
        `/uploadesController/${req.body.owner}/` +
        hashedName +
        `.` +
        ex;

      uploadedFile.mv(uploadPath, (err) => {
        if (err) {
          console.log("nen");
          return res.status(500).json({ message: "Error" });
        }
        return res.status(200).json({ message: "File uploaded" });
      });

      let newPost = new Post({
        image: `${hashedName}.${ex}`,
        owner: req.body.owner,
        description: req.body.postDescription,
        originalName: uploadedFile.name,
      });
      await newPost.save();
      return res.status(200);
    } catch (e) {
      console.log(e);
    }
  }

  async getAllUserPost(req, res) {
    try {
      const { username } = req.body;
      let result = await Post.find({ owner: username });
      return res.status(200).json(result);
    } catch (e) {
      console.log(e);
    }
  }

  async getCurrentPostImage(req, res) {
    try {
      const { _id } = req.body;
      console.log(_id);
      let currentPost = await Post.findOne({ _id });
      console.log(currentPost);
      if (!currentPost) {
        return res.status(400).json({ message: "Post not found" });
      }
      return res.sendFile(
        __dirname +
          `/uploadesController/${currentPost.owner}/${currentPost.image}`,
        (e) => console.log(e)
      );
    } catch (e) {
      console.log(e);
    }
  }

  async checkLikeCurrentPost(req, res) {
    try {
      const { child, _id } = req.body;
      const currentPost = await Post.findOne({ _id });
      if (currentPost.likes.includes(child)) {
        return res.status(200).json({ message: true });
      } else {
        return res.status(200).json({ message: false });
      }
    } catch (e) {
      console.log(e);
    }
  }

  async likeCurrentPost(req, res) {
    try {
      const { _id, child } = req.body;
      const currentPost = await Post.findOne({ _id });
      if (currentPost.likes.includes(child)) {
        currentPost.likes.splice(currentPost.likes.indexOf(child), 1);
        await currentPost.save();
        return res.status(200).json({ message: "dislike" });
      } else {
        currentPost.likes.push(child);
        await currentPost.save();
        return res.status(200).json({ message: "like" });
      }
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new authController();
