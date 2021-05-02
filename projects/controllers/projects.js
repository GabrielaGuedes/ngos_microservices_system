const express = require("express");
const { Validator } = require("express-json-validator-middleware");
const verifyJWT = require("../middleware/verify-jwt");

const Project = require("../models/projects");

const { projectsQueryFilters } = require("./utils/projects-query-filters");

const router = express.Router();
const { validate } = new Validator();

router.get("/", verifyJWT, async (req, res) => {
  const query = {
    order: [["startDate", req.query.startDateSort || "DESC"]],
    ...projectsQueryFilters(req.query),
  };

  await Project.Model.findAll(query)
    .then((result) => res.json(result))
    .catch((error) => res.status(500).json(error));
});

router.get("/:id", verifyJWT, async (req, res) => {
  await Project.Model.findByPk(req.params.id)
    .then((result) => res.json(result))
    .catch((error) => res.status(500).json(error));
});

router.post(
  "/",
  validate({ body: Project.jsonSchema }),
  verifyJWT,
  async (req, res) => {
    await Project.Model.create(req.body)
      .then((result) => res.json(result))
      .catch((error) => res.status(500).json(error));
  }
);

router.put(
  "/:id",
  validate({ body: Project.jsonSchema }),
  verifyJWT,
  async (req, res) => {
    const project = await Project.Model.findByPk(req.params.id);

    await project
      .update(req.body)
      .then((result) => res.json(result))
      .catch((error) => res.status(500).json(error));
  }
);

router.delete("/:id", verifyJWT, async (req, res) => {
  await Project.Model.destroy({ where: { id: req.params.id } })
    .then(() => res.json({ message: "Destroyed!" }))
    .catch((error) =>
      res.status(500).json({
        message: "An error occured. Are you sure the id is correct?",
        error,
      })
    );
});

module.exports = router;
