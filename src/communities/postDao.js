const { DATABASE_ERROR } = require("../../utils/baseResponseStatus");
const CustomException = require("../../utils/handler/customException");
const appDataSource = require("../../models/appDataSource");

const getAllposts = async () => {
  try {
    return await appDataSource.query(
      `
      SELECT
        u.id as userId,
        u.profile_image as userProfileImage,
        c.id as postingId,
        c.title as postingTitle,
        c.content as postingContent,
        JSON_ARRAYAGG(ci.community_image_url) as postingImageUrls
      FROM users as u
      LEFT JOIN communities c ON u.id = c.user_id
      LEFT JOIN community_images ci ON c.id = ci.community_id
      GROUP BY c.id;
      `
    );
  } catch (err) {
    throw new CustomException(DATABASE_ERROR);
  }
};

const checkExistPost = async (postId) => {
  try {
    return await appDataSource.query(
      `
        SELECT *
        FROM communities
        WHERE id = ?
      `,
      [postId]
    );
  } catch (err) {
    throw new CustomException(DATABASE_ERROR);
  }
};

const createPost = async (title, content, user_id) => {
  try {
    return await appDataSource.query(
      `
      INSERT INTO communities(title, content, user_id)
      VALUES (?, ?, ?);
    `,
      [title, content, user_id]
    );
  } catch (err) {
    throw new CustomException(DATABASE_ERROR);
  }
};

const saveImageUrl = async (postId, imageUrl, userId) => {
  try {
    return await appDataSource.query(
      `
      INSERT INTO community_images (community_id, user_id, community_image_url)
      VALUES (?, ?, ?);
      `,
      [postId, userId, imageUrl]
    );
  } catch (error) {
    throw new CustomException(DATABASE_ERROR);
  }
};

const deletePostById = async (postId) => {
  try {
    return await appDataSource.query(
      `
        DELETE
        FROM communities
        WHERE id = ?
      `,
      [postId]
    );
  } catch (err) {
    throw new CustomException(DATABASE_ERROR);
  }
};

module.exports = {
  getAllposts,
  checkExistPost,
  createPost,
  saveImageUrl,
  deletePostById,
};
