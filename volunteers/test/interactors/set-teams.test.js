/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const SetTeams = require("../../interactors/set-teams");
const volunteers = require("../../models/volunteers");
const teams = require("../../models/teams");
const teamVolunteers = require("../../models/team-volunteers");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let volunteer = {};
let teamsCreated = [];

describe("SetTeams", () => {
  beforeEach(async () => {
    await teamVolunteers.Model.destroy({ where: {} });
    await volunteers.Model.destroy({ where: {} });
    await teams.Model.destroy({ where: {} });

    const newTeams = [];
    volunteer = await volunteers.Model.create({
      name: "Base volunteer",
      address: "Base Street, 24",
      city: "Sao Paulo",
      state: "SP",
      country: "Brazil",
      birthDate: "1990-01-01",
      phone: 5511999999999,
      email: "add_team_test@example.com",
      additionalInfo: "no more info",
    });
    newTeams.push(
      await teams.Model.create({
        name: "Team 1",
        description: "Team 1 very cool",
      })
    );
    newTeams.push(
      await teams.Model.create({
        name: "Team 2",
        description: "Team 2 not so cool",
      })
    );
    teamsCreated = newTeams;
  });

  describe("When context passed is correct", () => {
    it("adds teams to volunteer", async () => {
      const context = {
        volunteer,
        teamIds: [teamsCreated[0].id],
      };

      const res = await SetTeams.run(context);
      const relationsFromDatabase = await teamVolunteers.Model.findAll();

      expect(res.volunteer.dataValues).to.have.own.property("teamIds");
      expect(res.volunteer.dataValues.teamIds).to.have.same.members([
        teamsCreated[0].id,
      ]);
      expect(relationsFromDatabase.length).to.eq(1);
    });
  });

  describe("When adding more than 1 team", () => {
    it("add all the teams", async () => {
      const context = {
        volunteer,
        teamIds: teamsCreated.map((team) => team.id),
      };

      const res = await SetTeams.run(context);
      const relationsFromDatabase = await teamVolunteers.Model.findAll();

      expect(res.volunteer.dataValues).to.have.own.property("teamIds");
      expect(res.volunteer.dataValues.teamIds).to.have.same.members(
        teamsCreated.map((team) => team.id)
      );
      expect(relationsFromDatabase.length).to.eq(teamsCreated.length);
    });
  });

  describe("When array is empty", () => {
    it("doesn't add teams", async () => {
      const context = {
        volunteer,
        teamIds: [],
      };

      const res = await SetTeams.run(context);
      const relationsFromDatabase = await teamVolunteers.Model.findAll();

      expect(res.volunteer.dataValues).to.have.own.property("teamIds");
      expect(res.volunteer.dataValues.teamIds).to.have.same.members([]);
      expect(relationsFromDatabase.length).to.eq(0);
    });
  });

  after(async () => {
    await teamVolunteers.Model.destroy({ where: {} });
    await volunteers.Model.destroy({ where: {} });
    await teams.Model.destroy({ where: {} });
  });
});
