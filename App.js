const express = require("express");
const { config } = require("dotenv");
const { uploader } = require("./Middleware/uploader");
const path = require("path");
const cookieParser = require("cookie-parser");
const {
  createPost,
  getPosts,
  deleteActivityPost,
  signIn,
  Profile,
} = require("./Api/main");
const { urlencoded } = require("body-parser");
const { Authenticator } = require("./Middleware/Auth");
const cors = require("cors");
config();

const port = process.env.PORT || 8080;
const app = express();
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.json());

app.use(
  cors({
    origin: "https://kaylaw-inc.onrender.com",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
app.post("/api/create", Authenticator, uploader(), createPost);
app.delete("/api/delete", Authenticator, deleteActivityPost);
app.get("/api/posts", getPosts);
app.post("/api/sign-in", signIn);
app.get("/api/profile", Authenticator, Profile);

app.listen(port, () => console.log(`Server running on ${port}`));
