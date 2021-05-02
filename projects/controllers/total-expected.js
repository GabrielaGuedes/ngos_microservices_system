const express = require("express");
const sequelize = require("../config/db-connection");
const verifyJWT = require("../middleware/verify-jwt");

const Project = require("../models/projects");

const { projectsQueryFilters } = require("./utils/projects-query-filters");

const router = express.Router();

router.get("/income/", verifyJWT, async (req, res) => {
  await Project.Model.findAll({
    attributes: [
      [
        sequelize.fn("SUM", sequelize.col("expectedIncome")),
        "totalExpectedIncome",
      ],
    ],
    ...projectsQueryFilters(req.query),
  })
    .then((result) => res.json(result[0]))
    .catch((error) => res.status(500).json(error));
});

router.get("/cost/", verifyJWT, async (req, res) => {
  await Project.Model.findAll({
    attributes: [
      [sequelize.fn("SUM", sequelize.col("expectedCost")), "totalExpectedCost"],
    ],
    ...projectsQueryFilters(req.query),
  })
    .then((result) => res.json(result[0]))
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
