const express = require("express");
const { Validator } = require("express-json-validator-middleware");
const verifyJWT = require("../middleware/verify-jwt");
const Team = require("../models/teams");

const router = express.Router();
const { validate } = new Validator();

router.get("/", verifyJWT, async (req, res) => {
  const query = { order: [["name", "ASC"]] };

  await Team.Model.findAll(query)
    .then((result) => res.json(result))
    .catch((error) => res.status(500).json(error));
});

router.get("/:id", verifyJWT, async (req, res) => {
  await Team.Model.findByPk(req.params.id)
    .then((result) => res.json(result))
    .catch((error) => res.status(500).json(error));
});

router.post(
  "/",
  validate({ body: Team.jsonSchema }),
  verifyJWT,
  async (req, res) => {
    await Team.Model.create(req.body)
      .then((result) => res.json(result))
      .catch((error) => res.status(500).json(error));
  }
);

router.put(
  "/:id",
  validate({ body: Team.jsonSchema }),
  verifyJWT,
  async (req, res) => {
    const team = await Team.Model.findByPk(req.params.id);

    await team
      .update(req.body)
      .then((result) => res.json(result))
      .catch((error) => res.status(500).json(error));
  }
);

router.delete("/:id", verifyJWT, async (req, res) => {
  await Team.Model.destroy({ where: { id: req.params.id } })
    .then(() => res.json({ message: "Destroyed!" }))
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
