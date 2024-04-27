const { activities } = require("../utils/mongodb");

const postCreate = async (title, postBody, date, id, picture, category) => {
  const dbResponse = await activities.insertOne({
    id,
    title,
    postBody,
    date,
    picture,
    category,
  });
  return dbResponse;
};
const postWithNoImage = async (title, postBody, date, id, category) => {
  const dbResponse = await activities.insertOne({
    id,
    title,
    postBody,
    date,
    category,
  });
  return dbResponse;
};
const getAllPost = async () => {
  const allPosts = await activities.find({}).toArray();
  return allPosts;
};
const deletePost = async (id) => {
  const response = await activities.deleteOne({ id: id });
  return response;
};

module.exports = { postCreate, postWithNoImage, getAllPost, deletePost };
