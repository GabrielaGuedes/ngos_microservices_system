const express = require("express");
const { Validator } = require("express-json-validator-middleware");
const multer = require("multer");
const verifyJWT = require("../middleware/verify-jwt");

const files = require("../models/files");
const Post = require("../models/posts");
const { postsQueryFilters } = require("./utils/posts-query-filter");
const { storage, fileFilter } = require("./utils/file-storage-helper");

const router = express.Router();
const { validate } = new Validator();

router.get("/", verifyJWT, async (req, res) => {
  const query = {
    order: [["date", "DESC"]],
    ...postsQueryFilters(req.query),
    include: files.Model,
  };

  await Post.Model.findAll(query)
    .then((result) => res.json(result))
    .catch((error) => res.status(500).json(error));
});

router.get("/:id", verifyJWT, async (req, res) => {
  await Post.Model.findByPk({
    where: { id: req.params.id },
    include: files.Model,
  })
    .then((result) => res.json(result))
    .catch((error) => res.status(500).json(error));
});

router.post(
  "/",
  validate({ body: Post.jsonSchema }),
  verifyJWT,
  async (req, res) => {
    const upload = multer({ storage, fileFilter }).array("multiple_images", 10);

    await upload(req, res, async (err) => {
      if (req.fileValidationError) {
        return res.send(req.fileValidationError);
      }
      if (err) {
        return res.send(err);
      }

      return Post.Model.create(
        { ...req.body, files: req.files.map((f) => ({ path: f.path })) },
        {
          include: [files.Model],
        }
      )
        .then((result) => res.json(result))
        .catch((error) => res.status(500).json(error));
    });
  }
);

router.put(
  "/:id",
  validate({ body: Post.jsonSchema }),
  verifyJWT,
  async (req, res) => {
    const project = await Post.Model.findByPk(req.params.id);

    await project
      .update(req.body)
      .then((result) => res.json(result))
      .catch((error) => res.status(500).json(error));
  }
);

router.delete("/:id", verifyJWT, async (req, res) => {
  await Post.Model.destroy({ where: { id: req.params.id } })
    .then(() => res.json({ message: "Destroyed!" }))
    .catch((error) =>
      res.status(500).json({
        message: "An error occured. Are you sure the id is correct?",
        error,
      })
    );
});

module.exports = router;
