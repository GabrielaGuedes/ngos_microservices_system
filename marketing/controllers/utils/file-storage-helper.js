const multer = require("multer");
const path = require("path");

const env = process.env.NODE_ENV || "development";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      env === "test" ? process.env.TEST_FILES_PATH : process.env.FILES_PATH
    );
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|pdf)$/)) {
    req.fileValidationError = "Only images or pdfs are allowed!";
    return cb(new Error("Only images or pdfs are allowed!"), false);
  }
  return cb(null, true);
};

module.exports = {
  storage,
  fileFilter,
};
