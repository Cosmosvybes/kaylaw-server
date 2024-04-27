const express = require("express");
const { config } = require("dotenv");
const { uploader } = require("./Middleware/uploader");
const {
  createPost,
  getPosts,
  deleteActivityPost,
  signIn,
} = require("./Api/main");
const { urlencoded } = require("body-parser");
const { Authenticator } = require("./Middleware/Auth");
config();
const port = process.env.PORT;
const app = express();
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.post("/api/create", uploader(), createPost);
app.delete("/api/delete", deleteActivityPost);
app.get("/api/posts", getPosts);
app.post("/api/sign-in", signIn);

app.listen(port, () => console.log(`Server running on ${port}`));
