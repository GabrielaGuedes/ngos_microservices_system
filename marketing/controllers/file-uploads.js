const express = require("express");
const fs = require("fs");
const multer = require("multer");
const verifyJWT = require("../middleware/verify-jwt");

const { storage, fileFilter } = require("./utils/file-storage-helper");

const router = express.Router();

router.post("/add", verifyJWT, async (req, res) => {
  const upload = multer({ storage, fileFilter }).array("multiple_files", 10);

  await upload(req, res, async (err) => {
    if (req.fileValidationError) {
      return res.status(500).send(req.fileValidationError);
    }
    if (err) {
      return res.status(500).send(err);
    }

    return res.json({ images: req.files });
  });
});

router.post("/remove", verifyJWT, async (req, res) => {
  try {
    req.body.paths.forEach((path) => fs.unlinkSync(path));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
