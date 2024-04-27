const cloudinary = require("cloudinary").v2;
const { config } = require("dotenv");
config();
const configuration = {
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  cloud_name: process.env.cloud_name,
};
cloudinary.config(configuration);

const imageUrlProvider = async (img) => {
  try {
    const response = await cloudinary.uploader.upload(img, {
      folder: "/kaylaw/posts/images",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
module.exports = { imageUrlProvider };
