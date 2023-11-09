const express = require("express");
const router = express.Router();

const userRouter = require("../src/users/userRouter");
const communityRouter = require("../src/communities/postRouter");

router.use("/users", userRouter.router);
router.use("/posts", communityRouter.router);

module.exports = router;
