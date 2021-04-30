const express = require("express");
const { Validator } = require("express-json-validator-middleware");
const verifyJWT = require("../middleware/verify-jwt");

const Area = require("../models/areas");
const employeeIds = require("../models/employee-ids");
const employees = require("../models/employees");

const { filterArrayWithEmployeeId } = require("../utils/filters-with");

const CreateAreaOrganizer = require("../interactors/create-area-organizer");
const UpdateAreaOrganizer = require("../interactors/update-area-organizer");
const DestroyAreaOrganizer = require("../interactors/destroy-area-organizer");

const router = express.Router();
const { validate } = new Validator();

router.get("/", verifyJWT, async (req, res) => {
  const { employeeId } = req.query;

  const query = { order: [["name", "ASC"]], include: [employees.Model] };

  await Area.Model.findAll(query)
    .then((result) => res.json(filterArrayWithEmployeeId(result, employeeId)))
    .catch((error) => res.status(500).json(error));
});

router.get("/:id", verifyJWT, async (req, res) => {
  await Area.Model.findByPk(req.params.id, { include: [employees.Model] })
    .then((result) => res.json(result))
    .catch((error) => res.status(500).json(error));
});

router.post(
  "/",
  validate({ body: { allOf: [Area.jsonSchema, employeeIds.jsonSchema] } }),
  verifyJWT,
  async (req, res) => {
    const context = {
      areaInfo: req.body,
      employeeIds: req.body.employeeIds,
    };

    await CreateAreaOrganizer.run(context)
      .then((result) => res.json(result.area))
      .catch((error) => res.status(500).json(error));
  }
);

router.put(
  "/:id",
  validate({ body: { allOf: [Area.jsonSchema, employeeIds.jsonSchema] } }),
  verifyJWT,
  async (req, res) => {
    const context = {
      area: await Area.Model.findByPk(req.params.id),
      areaInfo: req.body,
      employeeIds: req.body.employeeIds,
    };

    await UpdateAreaOrganizer.run(context)
      .then((result) => res.json(result.area))
      .catch((error) => res.status(500).json(error));
  }
);

router.delete("/:id", verifyJWT, async (req, res) => {
  await DestroyAreaOrganizer.run({ id: req.params.id })
    .then(() => res.json({ message: "Destroyed!" }))
    .catch((error) =>
      res.status(500).json({
        message: "An error occured. Are you sure the id is correct?",
        error,
      })
    );
});

module.exports = router;
