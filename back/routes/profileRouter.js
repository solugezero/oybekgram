const Router = require("express");
const router = new Router();
const controller = require("../controllers/profileController");

router.get("/", controller.getUserData);
router.get("/getAvatar/:username", controller.getUserAvatar);
router.post("/changeAvatar", controller.changeUserAvatar);
router.post("/checkFollow", controller.checkFollowOnUser);
router.post("/handleFollow", controller.handleFollowOnUser);
router.get("/:username", controller.getNotAuthUserByUsername);

module.exports = router;
