const express = require("express");
const { Validator } = require("express-json-validator-middleware");
const verifyJWT = require("../middleware/verify-jwt");

const CreateEmployeeOrganizer = require("../interactors/create-employee-organizer");
const UpdateEmployeeOrganizer = require("../interactors/update-employee-organizer");
const DestroyEmployeeOrganizer = require("../interactors/destroy-employee-organizer");

const employees = require("../models/employees");
const areas = require("../models/areas");
const teams = require("../models/teams");
const areaIds = require("../models/area-ids");
const teamIds = require("../models/team-ids");
const {
  filterEmployeesWithTeamId,
  filterEmployeesWithAreaId,
} = require("../utils/filters-with");

const router = express.Router();
const { validate } = new Validator();

router.get("/", verifyJWT, async (req, res) => {
  const { occupation, city, state, areaId, teamId } = req.query;

  const query = {
    order: [["name", "ASC"]],
    include: [areas.Model, teams.Model],
  };

  if (occupation) query.where = { ...query.where, occupation };
  if (city) query.where = { ...query.where, city };
  if (state) query.where = { ...query.where, state };

  await employees.Model.findAll(query)
    .then((result) => {
      res.json(
        filterEmployeesWithTeamId(
          filterEmployeesWithAreaId(result, areaId),
          teamId
        )
      );
    })
    .catch((error) => res.status(500).json(error));
});

router.get("/:id", verifyJWT, async (req, res) => {
  await employees.Model.findOne({
    where: { id: req.params.id },
    include: [areas.Model, teams.Model],
  })
    .then((result) => res.json(result))
    .catch((error) => res.status(500).json(error));
});

router.post(
  "/",
  validate({
    body: {
      allOf: [employees.jsonSchema, areaIds.jsonSchema, teamIds.jsonSchema],
    },
  }),
  verifyJWT,
  async (req, res) => {
    const context = {
      employeeInfo: req.body,
      teamIds: req.body.teamIds,
      areaIds: req.body.areaIds,
    };

    await CreateEmployeeOrganizer.run(context)
      .then((result) => res.json(result.employee))
      .catch((error) => res.status(500).json(error));
  }
);

router.put(
  "/:id",
  validate({
    body: {
      allOf: [employees.jsonSchema, areaIds.jsonSchema, teamIds.jsonSchema],
    },
  }),
  verifyJWT,
  async (req, res) => {
    const context = {
      employee: await employees.Model.findByPk(req.params.id),
      employeeInfo: req.body,
      areaIds: req.body.areaIds,
      teamIds: req.body.teamIds,
    };

    await UpdateEmployeeOrganizer.run(context)
      .then((result) => res.json(result))
      .catch((error) => res.status(500).json(error));
  }
);

router.delete("/:id", verifyJWT, async (req, res) => {
  await DestroyEmployeeOrganizer.run({ id: req.params.id })
    .then(() => res.json({ message: "Destroyed!" }))
    .catch((error) =>
      res.status(500).json({
        message: "An error occured. Are you sure the id is correct?",
        error,
      })
    );
});

module.exports = router;
