const { DATABASE_ERROR } = require("../../utils/baseResponseStatus");
const CustomException = require("../../utils/handler/customException");
const appDataSource = require("../../models/appDataSource");

const createUser = async (
  name,
  email,
  profileImage,
  password,
  latitude,
  longitude
) => {
  console.log(name, email, profileImage, password, latitude, longitude);
  try {
    await appDataSource.query(
      `
      INSERT INTO users(
      name,
      email, 
      profile_image,
      password,
      latitude,
      longitude
    ) VALUES (?, ?, ?, ?, ?, ?)
    `,
      [name, email, profileImage, password, latitude, longitude]
    );

    const result = await appDataSource.query(
      "SELECT LAST_INSERT_ID() as userId"
    );

    return result[0].userId;
  } catch (err) {
    throw new CustomException(DATABASE_ERROR);
  }
};

const findUserIdByEmail = async (email) => {
  try {
    const [data] = await appDataSource.query(
      `
      SELECT id, email, password
      FROM users
      WHERE email = ?;
      `,
      [email]
    );

    return data;
  } catch (err) {
    throw new CustomException(DATABASE_ERROR);
  }
};

module.exports = {
  createUser,
  findUserIdByEmail,
};
