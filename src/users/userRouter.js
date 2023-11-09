const express = require("express");
const router = express.Router();

const userController = require("./userController");
const auth = require("../../utils/auth");

try {
  router.post("/signup", userController.signUp);
  router.post("/signin", userController.signIn);
} catch (error) {
  console.log(error);
}

module.exports = {
  router,
};
