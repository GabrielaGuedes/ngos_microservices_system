/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const DestroyTeamOrganizer = require("../../interactors/destroy-team-organizer");
const teams = require("../../models/teams");
const volunteers = require("../../models/volunteers");
const teamVolunteers = require("../../models/team-volunteers");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let teamWithVolunteers = {};
let teamWithNothing = {};

describe("DestroyTeamOrganizer", () => {
  beforeEach(async () => {
    await teamVolunteers.Model.destroy({ where: {} });
    await teams.Model.destroy({ where: {} });
    await volunteers.Model.destroy({ where: {} });

    teamWithVolunteers = await teams.Model.create(
      {
        name: "Team with volunteers",
        description: "Just a cool team",
        volunteers: [
          {
            name: "Base volunteer 1",
            address: "Base Street, 24",
            city: "Sao Paulo",
            state: "SP",
            country: "Brazil",
            birthDate: "1990-01-01",
            phone: 5511999999999,
            email: "volunteer_1@example.com",
            additionalInfo: "no more info",
          },
          {
            name: "Base volunteer 2",
            address: "Base Street, 24",
            city: "Sao Paulo",
            state: "SP",
            country: "Brazil",
            birthDate: "1990-01-01",
            phone: 5511999999999,
            email: "volunteer_2@example.com",
            additionalInfo: "no more info",
          },
        ],
      },
      {
        include: volunteers.Model,
      }
    );

    teamWithNothing = await teams.Model.create({
      name: "Team without volunteers",
      description: "no more info",
    });
  });

  describe("When team has volunteers", () => {
    it("removes relations and destroys team", async () => {
      const context = {
        id: teamWithVolunteers.id,
      };

      const res = await DestroyTeamOrganizer.run(context);
      const volunteerRelationsFromDatabase = await teamVolunteers.Model.findAll(
        {
          where: { teamId: teamWithVolunteers.id },
        }
      );
      const teamFromDatabase = await teams.Model.findAll({
        where: { name: teamWithVolunteers.name },
      });

      expect(res.volunteerIds).to.eql([]);
      expect(res.success).to.eql(true);
      expect(volunteerRelationsFromDatabase.length).to.eq(0);
      expect(teamFromDatabase).to.eql([]);
    });
  });

  describe("When team has nothing", () => {
    it("destroys team", async () => {
      const context = {
        id: teamWithNothing.id,
      };

      const res = await DestroyTeamOrganizer.run(context);
      const teamFromDatabase = await teams.Model.findAll({
        where: { name: teamWithNothing.name },
      });

      expect(res.success).to.eql(true);
      expect(teamFromDatabase).to.eql([]);
    });
  });

  after(async () => {
    await teamVolunteers.Model.destroy({ where: {} });
    await teams.Model.destroy({ where: {} });
    await volunteers.Model.destroy({ where: {} });
  });
});
