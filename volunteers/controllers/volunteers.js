const express = require("express");
const { Validator } = require("express-json-validator-middleware");
const verifyJWT = require("../middleware/verify-jwt");

const CreateVolunteerOrganizer = require("../interactors/create-volunteer-organizer");
const UpdateVolunteerOrganizer = require("../interactors/update-volunteer-organizer");
const DestroyVolunteerOrganizer = require("../interactors/destroy-volunteer-organizer");

const volunteers = require("../models/volunteers");
const areas = require("../models/areas");
const teams = require("../models/teams");
const areaIds = require("../models/area-ids");
const teamIds = require("../models/team-ids");
const {
  filterVolunteersWithTeamId,
  filterVolunteersWithAreaId,
} = require("../utils/filters-with");

const router = express.Router();
const { validate } = new Validator();

router.get("/", verifyJWT, async (req, res) => {
  const { city, state, areaId, teamId } = req.query;

  const query = {
    order: [["name", "ASC"]],
    include: [areas.Model, teams.Model],
  };

  if (city) query.where = { ...query.where, city };
  if (state) query.where = { ...query.where, state };

  await volunteers.Model.findAll(query)
    .then((result) => {
      res.json(
        filterVolunteersWithTeamId(
          filterVolunteersWithAreaId(result, areaId),
          teamId
        )
      );
    })
    .catch((error) => res.status(500).json(error));
});

router.get("/:id", verifyJWT, async (req, res) => {
  await volunteers.Model.findOne({
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
      allOf: [volunteers.jsonSchema, areaIds.jsonSchema, teamIds.jsonSchema],
    },
  }),
  verifyJWT,
  async (req, res) => {
    const context = {
      volunteerInfo: req.body,
      teamIds: req.body.teamIds,
      areaIds: req.body.areaIds,
    };

    await CreateVolunteerOrganizer.run(context)
      .then((result) => res.json(result.volunteer))
      .catch((error) => res.status(500).json(error));
  }
);

router.put(
  "/:id",
  validate({
    body: {
      allOf: [volunteers.jsonSchema, areaIds.jsonSchema, teamIds.jsonSchema],
    },
  }),
  verifyJWT,
  async (req, res) => {
    const context = {
      volunteer: await volunteers.Model.findByPk(req.params.id),
      volunteerInfo: req.body,
      areaIds: req.body.areaIds,
      teamIds: req.body.teamIds,
    };

    await UpdateVolunteerOrganizer.run(context)
      .then((result) => res.json(result.volunteer))
      .catch((error) => res.status(500).json(error));
  }
);

router.delete("/:id", verifyJWT, async (req, res) => {
  await DestroyVolunteerOrganizer.run({ id: req.params.id })
    .then(() => res.json({ message: "Destroyed!" }))
    .catch((error) =>
      res.status(500).json({
        message: "An error occured. Are you sure the id is correct?",
        error,
      })
    );
});

module.exports = router;
