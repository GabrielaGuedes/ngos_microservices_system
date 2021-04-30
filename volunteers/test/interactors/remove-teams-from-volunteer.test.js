/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const RemoveTeamsFromVolunteer = require("../../interactors/remove-teams-from-volunteer");
const volunteers = require("../../models/volunteers");
const teams = require("../../models/teams");
const teamVolunteers = require("../../models/team-volunteers");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let volunteerCreatedWithTeams = {};
let volunteerCreatedWithoutTeams = {};

describe("RemoveTeamsFromVolunteer", () => {
  beforeEach(async () => {
    await teamVolunteers.Model.destroy({ where: {} });
    await volunteers.Model.destroy({ where: {} });
    await teams.Model.destroy({ where: {} });

    volunteerCreatedWithTeams = await volunteers.Model.create(
      {
        name: "Base volunteer",
        address: "Base Street, 24",
        city: "Sao Paulo",
        state: "SP",
        country: "Brazil",
        birthDate: "1990-01-01",
        phone: 5511999999999,
        email: "remove_teams_test@example.com",
        additionalInfo: "no more info",
        teams: [
          {
            name: "Team 1",
            description: "Team 1 very cool",
          },
          {
            name: "Team 2",
            description: "Team 2 not so cool",
          },
        ],
      },
      {
        include: teams.Model,
      }
    );

    volunteerCreatedWithoutTeams = await volunteers.Model.create({
      name: "Base volunteer without team",
      address: "Base Street, 24",
      city: "Sao Paulo",
      state: "SP",
      country: "Brazil",
      birthDate: "1990-01-01",
      phone: 5511999999999,
      email: "without_teams@example.com",
      additionalInfo: "no more info",
    });
  });

  describe("When context passed is correct", () => {
    it("remove teams from volunteer", async () => {
      const context = {
        id: volunteerCreatedWithTeams.id,
      };

      const res = await RemoveTeamsFromVolunteer.run(context);
      const relationsFromDatabase = await teamVolunteers.Model.findAll();
      const volunteerFromDatabase = await volunteers.Model.findOne({
        where: { email: volunteerCreatedWithTeams.email },
        include: teams.Model,
      });

      expect(res.teamIds).to.eql([]);
      expect(relationsFromDatabase.length).to.eq(0);
      expect(volunteerFromDatabase.teams).to.eql([]);
    });
  });

  describe("When volunteer has no teams", () => {
    it("just does nothing", async () => {
      const context = {
        id: volunteerCreatedWithoutTeams.id,
      };

      const res = await RemoveTeamsFromVolunteer.run(context);
      const volunteerFromDatabase = await volunteers.Model.findOne({
        where: { email: volunteerCreatedWithoutTeams.email },
        include: teams.Model,
      });

      expect(res.teamIds).to.eql([]);
      expect(volunteerFromDatabase.teams).to.eql([]);
    });
  });

  after(async () => {
    await teamVolunteers.Model.destroy({ where: {} });
    await volunteers.Model.destroy({ where: {} });
    await teams.Model.destroy({ where: {} });
  });
});
