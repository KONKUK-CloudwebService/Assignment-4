const express = require("express");
const router = express.Router();

const userRouter = require("../src/users/userRouter");
router.use("/users", userRouter.router);

module.exports = router;
