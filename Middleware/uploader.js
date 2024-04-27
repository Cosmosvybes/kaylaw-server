const multer = require("multer");
const imageUploader = multer({
  dest: "images/",
  limits: { fieldSize: 10 * 1024 * 1024 },
});

const uploader = () => {
  const uploaderResponse = imageUploader.array("images", 12);
  return uploaderResponse;
};
module.exports = { uploader };
