const userService = require("../users/userService");
const baseResponse = require("../../utils/baseResponse");
const { KEY_ERROR, NONE_POST } = require("../../utils/baseResponseStatus");
const CustomException = require("../../utils/handler/customException");

const signUp = async (req, res, next) => {
  try {
    const { name, email, profileImage, password, latitude, longitude } =
      req.body;

    if (
      !name ||
      !email ||
      !password ||
      !profileImage ||
      !latitude ||
      !longitude
    ) {
      return CustomException(KEY_ERROR);
    }

    const userId = await userService.signUp(
      name,
      email,
      profileImage,
      password,
      latitude,
      longitude
    );

    return baseResponse({ userId }, res);
  } catch (error) {
    console.log(error);
    return baseResponse(error, res);
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new CustomException(KEY_ERROR);
    }

    const token = await userService.signIn(email, password);
    return baseResponse({ accessToken: token }, res);
  } catch (error) {
    console.log(error);
    return baseResponse(error, res);
  }
};

module.exports = {
  signUp,
  signIn,
};
