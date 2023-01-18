const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { secret } = require("../config");
const fileUpload = require("express-fileupload");

class authController {
  async getUserData(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const authUser = {
        username: jwt.verify(token, secret).username,
        _id: jwt.verify(token, secret).id,
      };
      const currentUserData = await User.findOne(authUser);
      return res.status(200).json(currentUserData);
    } catch (e) {
      console.log(e);
    }
  }

  async getNotAuthUserByUsername(req, res) {
    try {
      const { username } = req.params;
      const currentUser = await User.findOne({ username });
      if (!currentUser) {
        return res.status(400).json({ message: "Пользователя не существует" });
      }
      return res.status(200).json(currentUser);
    } catch (e) {
      return res.status(400).json({ message: "Find error" });
    }
  }

  async getUserAvatar(req, res) {
    try {
      const { username } = req.params;
      const currentUser = await User.findOne({ username });
      if (!currentUser) {
        return res.status(400).json({ message: "Not found this username" });
      }
      if (
        currentUser.avatar.split(":")[0] === "https" ||
        currentUser.avatar.split(":")[0] === "http"
      )
        return res.status(400).json({ message: currentUser.avatar });
      return res.sendFile(
        __dirname +
          `/uploadesController/${username}/avatar/${currentUser.avatar}`,
        (e) => console.log(e)
      );
    } catch (e) {
      console.log(e);
    }
  }

  async changeUserAvatar(req, res) {
    console.log("123");
    try {
      let uploadedFile;
      let uploadPath;

      if (!req.files || Object.keys(req.files) === 0) {
        return res.status(400).json({ message: "No files were uploaded" });
      }
      uploadedFile = req.files.uploadedFile;
      uploadPath =
        __dirname +
        `/uploadesController/${req.body.username}/avatar/` +
        uploadedFile.name;
      console.log(uploadPath);
      const currentUser = await User.findOneAndUpdate(
        { username: req.body.username },
        { avatar: uploadedFile.name }
      );

      uploadedFile.mv(uploadPath, (err) => {
        if (err) {
          console.log("nen");
          return res.status(500).json({ message: "Error" });
        }
        return res.status(200).json({ message: "File uploaded" });
      });
    } catch (e) {
      console.log(e);
    }
  }

  async checkFollowOnUser(req, res) {
    try {
      const { parent, child } = req.body;
      const parentUser = await User.findOne({ username: parent });
      const childUser = await User.findOne({ username: child });
      if (parentUser.followers.includes(childUser.username))
        return res.status(200).json({ message: true });
      else return res.status(200).json({ message: false });
    } catch (e) {
      console.log(e);
    }
  }

  async handleFollowOnUser(req, res) {
    try {
      const { parent, child } = req.body;
      let childUser = await User.findOne({ username: child });
      let parentUser = await User.findOne({ username: parent });
      if (parentUser.followers.includes(childUser.username)) {
        parentUser.followers.splice(
          parentUser.followers.indexOf(childUser.username),
          1
        );
        childUser.following.splice(
          childUser.following.indexOf(parentUser.username),
          1
        );
        await childUser.save();
        await parentUser.save();
        return res.status(200).json({ message: "unfollow" });
      } else {
        parentUser.followers.push(childUser.username);
        childUser.following.push(parentUser.username);
        await childUser.save();
        await parentUser.save();
        return res.status(200).json({ message: "follow" });
      }
      // console.log(parentUser.followers.indexOf(childUser.username));
      // return res.status(200);
    } catch (e) {}
  }
}

module.exports = new authController();
