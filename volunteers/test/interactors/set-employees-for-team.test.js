/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const SetVolunteersForTeam = require("../../interactors/set-volunteers-for-team");
const volunteers = require("../../models/volunteers");
const teams = require("../../models/teams");
const teamVolunteers = require("../../models/team-volunteers");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let team = {};
let volunteersCreated = [];

describe("SetVolunteersForTeam", () => {
  beforeEach(async () => {
    await teamVolunteers.Model.destroy({ where: {} });
    await volunteers.Model.destroy({ where: {} });
    await teams.Model.destroy({ where: {} });

    const newVolunteers = [];
    team = await teams.Model.create({
      name: "Team 1",
      description: "Team 1 very cool",
    });
    newVolunteers.push(
      await volunteers.Model.create({
        name: "Base volunteer 1",
        address: "Base Street, 24",
        city: "Sao Paulo",
        state: "SP",
        country: "Brazil",
        occupation: "Software Engineer",
        birthDate: "1990-01-01",
        hireDate: "2020-01-01",
        phone: 5511999999999,
        email: "set_volunteer_for_team_test_1@example.com",
        additionalInfo: "no more info",
      })
    );
    newVolunteers.push(
      await volunteers.Model.create({
        name: "Base volunteer 2",
        address: "Base Street, 24",
        city: "Sao Paulo",
        state: "SP",
        country: "Brazil",
        occupation: "Software Engineer",
        birthDate: "1990-01-01",
        hireDate: "2020-01-01",
        phone: 5511999999999,
        email: "set_volunteer_for_team_test_2@example.com",
        additionalInfo: "no more info",
      })
    );
    volunteersCreated = newVolunteers;
  });

  describe("When context passed is correct", () => {
    it("adds volunteers to team", async () => {
      const context = {
        team,
        volunteerIds: [volunteersCreated[0].id],
      };

      const res = await SetVolunteersForTeam.run(context);
      const relationsFromDatabase = await teamVolunteers.Model.findAll();

      expect(res.team.dataValues).to.have.own.property("volunteerIds");
      expect(res.team.dataValues.volunteerIds).to.have.same.members([
        volunteersCreated[0].id,
      ]);
      expect(relationsFromDatabase.length).to.eq(1);
    });
  });

  describe("When adding more than 1 volunteer", () => {
    it("add all the volunteers", async () => {
      const context = {
        team,
        volunteerIds: volunteersCreated.map((volunteer) => volunteer.id),
      };

      const res = await SetVolunteersForTeam.run(context);
      const relationsFromDatabase = await teamVolunteers.Model.findAll();

      expect(res.team.dataValues).to.have.own.property("volunteerIds");
      expect(res.team.dataValues.volunteerIds).to.have.same.members(
        volunteersCreated.map((volunteer) => volunteer.id)
      );
      expect(relationsFromDatabase.length).to.eq(volunteersCreated.length);
    });
  });

  describe("When array is empty", () => {
    it("doesn't add volunteers", async () => {
      const context = {
        team,
        volunteerIds: [],
      };

      const res = await SetVolunteersForTeam.run(context);
      const relationsFromDatabase = await teamVolunteers.Model.findAll();

      expect(res.team.dataValues).to.have.own.property("volunteerIds");
      expect(res.team.dataValues.volunteerIds).to.have.same.members([]);
      expect(relationsFromDatabase.length).to.eq(0);
    });
  });

  after(async () => {
    await teamVolunteers.Model.destroy({ where: {} });
    await volunteers.Model.destroy({ where: {} });
    await volunteers.Model.destroy({ where: {} });
  });
});
