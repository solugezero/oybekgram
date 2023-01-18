const Router = require("express");
const router = new Router();
const controller = require("../controllers/postController");
const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();
app.use(fileUpload());

router.post("/addPost", controller.createNewPost);
router.post("/getAllUserPost", controller.getAllUserPost);
router.post("/getCurrentPostImage", controller.getCurrentPostImage);
router.post("/like", controller.likeCurrentPost);
router.post("/checkLike", controller.checkLikeCurrentPost);

module.exports = router;
