/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const volunteers = require("../../models/volunteers");
const teams = require("../../models/teams");
const teamVolunteers = require("../../models/team-volunteers");
const CreateTeamOrganizer = require("../../interactors/create-team-organizer");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let volunteersCreated = [];

const teamInfo = {
  name: "Team 1",
  description: "Team 1 very cool",
};

describe("CreateTeamOrganizer", () => {
  beforeEach(async () => {
    await teamVolunteers.Model.destroy({ where: {} });
    await volunteers.Model.destroy({ where: {} });
    await teams.Model.destroy({ where: {} });

    const newVolunteers = [];
    newVolunteers.push(
      await volunteers.Model.create({
        name: "Base volunteer 1",
        address: "Base Street, 24",
        city: "Sao Paulo",
        state: "SP",
        country: "Brazil",
        birthDate: "1990-01-01",
        phone: 5511999999999,
        email: "create_team_organizer_1@example.com",
        additionalInfo: "no more info",
      })
    );
    newVolunteers.push(
      await volunteers.Model.create({
        name: "Base volunteer",
        address: "Base Street, 24",
        city: "Sao Paulo",
        state: "SP",
        country: "Brazil",
        birthDate: "1990-01-01",
        phone: 5511999999999,
        email: "create_team_organizer_2@example.com",
        additionalInfo: "no more info",
      })
    );
    volunteersCreated = newVolunteers;
  });

  describe("When context passed is correct", () => {
    it("creates team with volunteers", async () => {
      const volunteerIds = volunteersCreated.map((volunteer) => volunteer.id);
      const context = {
        teamInfo,
        volunteerIds,
      };

      const res = await CreateTeamOrganizer.run(context);
      const teamsRelationFromDatabase = await teamVolunteers.Model.findAll();
      const teamsFromDatabase = await teams.Model.findAll();

      expect(res.team.dataValues).to.have.own.property("volunteerIds");
      expect(teamsFromDatabase.length).to.eq(1);
      expect(res.team.id).to.eq(teamsFromDatabase[0].id);
      expect(res.team.dataValues.volunteerIds).to.have.same.members(
        volunteerIds
      );
      expect(teamsRelationFromDatabase.length).to.eq(volunteerIds.length);
    });
  });

  describe("When volunteerIds doesn't exist", () => {
    it("doesn't create team", async () => {
      const volunteerIds = volunteersCreated.map(
        (volunteer) => volunteer.id + 6
      );
      const context = {
        teamInfo,
        volunteerIds,
      };

      await CreateTeamOrganizer.run(context).catch(async (err) => {
        expect(err).to.be.an("error");
        const teamsRelationFromDatabase = await teamVolunteers.Model.findAll();
        const teamsFromDatabase = await teams.Model.findAll();

        expect(teamsFromDatabase.length).to.eq(0);
        expect(teamsRelationFromDatabase.length).to.eq(0);
      });
    });
  });

  after(async () => {
    await teamVolunteers.Model.destroy({ where: {} });
    await volunteers.Model.destroy({ where: {} });
    await teams.Model.destroy({ where: {} });
  });
});
