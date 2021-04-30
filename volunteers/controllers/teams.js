const express = require("express");
const { Validator } = require("express-json-validator-middleware");
const verifyJWT = require("../middleware/verify-jwt");

const Team = require("../models/teams");
const volunteerIds = require("../models/volunteer-ids");
const volunteers = require("../models/volunteers");

const { filterArrayWithVolunteerId } = require("../utils/filters-with");

const CreateTeamOrganizer = require("../interactors/create-team-organizer");
const UpdateTeamOrganizer = require("../interactors/update-team-organizer");
const DestroyTeamOrganizer = require("../interactors/destroy-team-organizer");

const router = express.Router();
const { validate } = new Validator();

router.get("/", verifyJWT, async (req, res) => {
  const { volunteerId } = req.query;

  const query = { order: [["name", "ASC"]], include: [volunteers.Model] };

  await Team.Model.findAll(query)
    .then((result) => res.json(filterArrayWithVolunteerId(result, volunteerId)))
    .catch((error) => res.status(500).json(error));
});

router.get("/:id", verifyJWT, async (req, res) => {
  await Team.Model.findByPk(req.params.id, { include: [volunteers.Model] })
    .then((result) => res.json(result))
    .catch((error) => res.status(500).json(error));
});

router.post(
  "/",
  validate({ body: { allOf: [Team.jsonSchema, volunteerIds.jsonSchema] } }),
  verifyJWT,
  async (req, res) => {
    const context = {
      teamInfo: req.body,
      volunteerIds: req.body.volunteerIds,
    };

    await CreateTeamOrganizer.run(context)
      .then((result) => res.json(result.team))
      .catch((error) => res.status(500).json(error));
  }
);

router.put(
  "/:id",
  validate({ body: { allOf: [Team.jsonSchema, volunteerIds.jsonSchema] } }),
  verifyJWT,
  async (req, res) => {
    const context = {
      team: await Team.Model.findByPk(req.params.id),
      teamInfo: req.body,
      volunteerIds: req.body.volunteerIds,
    };

    await UpdateTeamOrganizer.run(context)
      .then((result) => res.json(result.team))
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
