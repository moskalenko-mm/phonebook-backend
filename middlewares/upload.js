const multer = require("multer");
const path = require("path");

const avatarPath = path.join(__dirname, "../", "tmp");

const config = multer.diskStorage({
  destination: avatarPath,
});

const upload = multer({ storage: config });

module.exports = upload;
