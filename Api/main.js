const { getAdmin } = require("../Model/Admin");
// const { config } = require("dotenv");
// config();
const {
  postCreate,
  postWithNoImage,
  getAllPost,
  deletePost,
} = require("../Model/Post");
const { imageUrlProvider } = require("../utils/cloudinary");
const jwt = require("jsonwebtoken");

const createPost = async (req, res) => {
  const { id, title, postBody, date, category } = req.body;
  const images = req.files;
  try {
    let imageURl = [];
    for (let i = 0; i < images.length; i++) {
      let response = await imageUrlProvider(images[i].path);
      imageURl.push(response.url);
    }
    const serverResponse =
      imageURl.length > 0
        ? await postCreate(title, postBody, date, id, imageURl, category)
        : await postWithNoImage(title, postBody, date, id, category);
    if (serverResponse.insertedId) {
      res.status(200).send({ response: "Post successfully created" });
    }
  } catch (error) {
    res.status(503).send({ response: "Operation failed" });
  }
};

const getPosts = async (req, res) => {
  try {
    const allPosts = await getAllPost();
    res.status(200).send({ response: allPosts });
  } catch (error) {
    res.status(500).send({ res: "Error getting posts", error });
  }
};
const deleteActivityPost = async (req, res) => {
  const { id } = req.body;
  try {
    const response = await deletePost(id);
    if (response.deletedCount === 1) {
      res.status(200).send({ response: "Post deleted" });
    }
  } catch (error) {
    res.status(500).send({ response: "operation failed, internal error" });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);
  try {
    const user = await getAdmin(email);
    if (user) {
      if (user.password != password) {
        res.status(403).send({ response: "Invalid credientials" });
      } else {
        const token = jwt.sign({ payload: email }, process.env.api_secret);
        res.cookie("userToken", token, { maxAge: 360000000, path: "/api/" });
        res.status(200).send({ response: "Sign in successful", token });
      }
    } else {
      res.status(401).send({ response: "Access Denied, user not found" });
    }
  } catch (error) {
    res.status(503).send({ response: "Internal server error" });
  }
};
const Profile = async (req, res) => {
  const email = req.user.payload;
  const user = await getAdmin(email);
  res.status(200).send({ user: user, isAuthenticated: true });
};

module.exports = { createPost, getPosts, deleteActivityPost, signIn, Profile };
