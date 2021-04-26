const express = require("express");
const { Validator } = require("express-json-validator-middleware");
const verifyJWT = require("../middleware/verify-jwt");
const Employee = require("../models/employees");

const router = express.Router();
const { validate } = new Validator();

router.post(
  "/",
  validate({ body: Employee.jsonSchema }),
  verifyJWT,
  async (req, res) => {
    await Employee.Model.create(req.body)
      .then((result) => res.json(result))
      .catch((error) => res.status(500).json(error));
  }
);

router.get("/", verifyJWT, async (req, res) => {
  await Employee.Model.findAll()
    .then((result) => res.json(result))
    .catch((error) => res.status(500).json(error));
});

router.get("/:id", verifyJWT, async (req, res) => {
  await Employee.Model.findByPk(req.params.id)
    .then((result) => res.json(result))
    .catch((error) => res.status(500).json(error));
});

router.put("/:id", verifyJWT, async (req, res) => {
  const employee = await Employee.Model.findByPk(req.params.id);

  await employee
    .update(req.body)
    .then((result) => res.json(result))
    .catch((error) => res.status(500).json(error));
});

router.delete("/:id", verifyJWT, async (req, res) => {
  await Employee.Model.destroy({ where: { id: req.params.id } })
    .then(() => res.json({ message: "Destroyed!" }))
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
