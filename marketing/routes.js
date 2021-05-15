const express = require("express");
const posts = require("./controllers/posts");
const fileUploads = require("./controllers/file-uploads");

const router = express.Router();

router.use("/api/posts", posts);
router.use("/api/file-uploads", fileUploads);

module.exports = router;
