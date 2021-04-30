/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const volunteers = require("../../models/volunteers");
const teams = require("../../models/teams");
const teamVolunteers = require("../../models/team-volunteers");
const UpdateTeamOrganizer = require("../../interactors/update-team-organizer");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let volunteersCreated = [];
let teamCreatedWithVolunteers = {};

describe("UpdateTeamOrganizer", () => {
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
    teamCreatedWithVolunteers = await teams.Model.create(
      {
        name: "Team 1",
        description: "Team 1 very cool",
        volunteers: [
          {
            name: "Base volunteer For team 1",
            address: "Base Street, 24",
            city: "Sao Paulo",
            state: "SP",
            country: "Brazil",
            birthDate: "1990-01-01",
            phone: 5511999999999,
            email: "volunteer_for_team_1@example.com",
            additionalInfo: "no more info",
          },
        ],
      },
      {
        include: volunteers.Model,
      }
    );
  });

  describe("When context passed is correct", () => {
    it("updates the team with new volunteers", async () => {
      const volunteerIds = volunteersCreated.map((volunteer) => volunteer.id);
      const newDescription = "Brand new description here";
      const context = {
        team: teamCreatedWithVolunteers,
        teamInfo: {
          description: newDescription,
        },
        volunteerIds,
      };

      const res = await UpdateTeamOrganizer.run(context);
      const teamsRelationFromDatabase = await teamVolunteers.Model.findAll();
      const teamsFromDatabase = await teams.Model.findAll({
        include: volunteers.Model,
      });

      expect(res.team.dataValues).to.have.own.property("volunteerIds");
      expect(teamsFromDatabase.length).to.eq(1);
      expect(teamsFromDatabase[0].description).to.eq(newDescription);
      expect(res.team.dataValues.volunteerIds).to.have.same.members(
        volunteerIds
      );
      expect(teamsRelationFromDatabase.length).to.eq(volunteerIds.length);
      expect(
        teamsFromDatabase[0].volunteers.map((emp) => emp.id)
      ).to.have.same.members(volunteerIds);
    });
  });

  after(async () => {
    await teamVolunteers.Model.destroy({ where: {} });
    await volunteers.Model.destroy({ where: {} });
    await teams.Model.destroy({ where: {} });
  });
});
