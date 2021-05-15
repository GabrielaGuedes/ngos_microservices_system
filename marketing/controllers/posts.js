const express = require("express");
const { Validator } = require("express-json-validator-middleware");
const multer = require("multer");
const verifyJWT = require("../middleware/verify-jwt");

const files = require("../models/files");
const Post = require("../models/posts");
const { postsQueryFilter } = require("./utils/posts-query-filter");
const { storage, fileFilter } = require("./utils/file-storage-helper");
const UpdatePostOrganizer = require("../interactors/update-post-organizer");
const DestroyPostOrganizer = require("../interactors/destroy-post-organizer");

const router = express.Router();
const { validate } = new Validator();

router.get("/", verifyJWT, async (req, res) => {
  let order = {};
  if (req.query.orderByPeopleReached) {
    order = {
      order: [["peopleReached", "DESC"]],
    };
    req.query.withPeopleReached = true;
  }
  const query = {
    ...order,
    ...postsQueryFilter(req.query),
    include: files.Model,
  };

  await Post.Model.findAll(query)
    .then((result) => res.json(result))
    .catch((error) => res.status(500).json(error));
});

router.get("/:id", verifyJWT, async (req, res) => {
  await Post.Model.findOne({
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
    const upload = multer({ storage, fileFilter }).array("multiple_images", 10);

    await upload(req, res, async (err) => {
      if (req.fileValidationError) {
        return res.send(req.fileValidationError);
      }
      if (err) {
        return res.send(err);
      }

      const context = {
        id: req.params.id,
        postInfo: req.body,
        filePaths: req.files.map((f) => ({ path: f.path })),
      };

      return UpdatePostOrganizer.run(context)
        .then((result) => res.json(result.post))
        .catch((error) => res.status(500).json(error));
    });
  }
);

router.delete("/:id", verifyJWT, async (req, res) => {
  await DestroyPostOrganizer.run({ id: req.params.id })
    .then(() => res.json({ message: "Destroyed!" }))
    .catch((error) =>
      res.status(500).json({
        message: "An error occured. Are you sure the id is correct?",
        error,
      })
    );
});

module.exports = router;
