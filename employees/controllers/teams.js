const express = require("express");
const { Validator } = require("express-json-validator-middleware");
const verifyJWT = require("../middleware/verify-jwt");

const Team = require("../models/teams");
const employeeIds = require("../models/employee-ids");
const employees = require("../models/employees");

const { filterArrayWithEmployeeId } = require("../utils/filters-with");

const CreateTeamOrganizer = require("../interactors/create-team-organizer");
const UpdateTeamOrganizer = require("../interactors/update-team-organizer");
const DestroyTeamOrganizer = require("../interactors/destroy-team-organizer");

const router = express.Router();
const { validate } = new Validator();

router.get("/", verifyJWT, async (req, res) => {
  const { employeeId } = req.query;

  const query = { order: [["name", "ASC"]], include: [employees.Model] };

  await Team.Model.findAll(query)
    .then((result) => res.json(filterArrayWithEmployeeId(result, employeeId)))
    .catch((error) => res.status(500).json(error));
});

router.get("/:id", verifyJWT, async (req, res) => {
  await Team.Model.findByPk(req.params.id, { include: [employees.Model] })
    .then((result) => res.json(result))
    .catch((error) => res.status(500).json(error));
});

router.post(
  "/",
  validate({ body: { allOf: [Team.jsonSchema, employeeIds.jsonSchema] } }),
  verifyJWT,
  async (req, res) => {
    const context = {
      teamInfo: req.body,
      employeeIds: req.body.employeeIds,
    };

    await CreateTeamOrganizer.run(context)
      .then((result) => res.json(result))
      .catch((error) => res.status(500).json(error));
  }
);

router.put(
  "/:id",
  validate({ body: { allOf: [Team.jsonSchema, employeeIds.jsonSchema] } }),
  verifyJWT,
  async (req, res) => {
    const context = {
      team: await Team.Model.findByPk(req.params.id),
      teamInfo: req.body,
      employeeIds: req.body.employeeIds,
    };

    await UpdateTeamOrganizer.run(context)
      .then((result) => res.json(result))
      .catch((error) => res.status(500).json(error));
  }
);

router.delete("/:id", verifyJWT, async (req, res) => {
  await DestroyTeamOrganizer.run({ id: req.params.id })
    .then(() => res.json({ message: "Destroyed!" }))
    .catch((error) =>
      res.status(500).json({
        message: "An error occured. Are you sure the id is correct?",
        error,
      })
    );
});

module.exports = router;
