const express = require("express");
const posts = require("./controllers/posts");

const router = express.Router();

router.use("/api/posts", posts);

module.exports = router;
