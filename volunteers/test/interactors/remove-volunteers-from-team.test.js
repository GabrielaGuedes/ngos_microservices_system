/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const RemoveVolunteersFromTeam = require("../../interactors/remove-volunteers-from-team");
const teams = require("../../models/teams");
const volunteers = require("../../models/volunteers");
const teamVolunteers = require("../../models/team-volunteers");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let teamCreatedWithVolunteers = {};
let teamCreatedWithoutVolunteers = {};

describe("RemoveVolunteersFromTeam", () => {
  beforeEach(async () => {
    await teamVolunteers.Model.destroy({ where: {} });
    await teams.Model.destroy({ where: {} });
    await volunteers.Model.destroy({ where: {} });

    teamCreatedWithVolunteers = await teams.Model.create(
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
            occupation: "Software Engineer",
            birthDate: "1990-01-01",
            hireDate: "2020-01-01",
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
            occupation: "Software Engineer",
            birthDate: "1990-01-01",
            hireDate: "2020-01-01",
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

    teamCreatedWithoutVolunteers = await teams.Model.create({
      name: "Team without volunteers",
      description: "no more info",
    });
  });

  describe("When context passed is correct", () => {
    it("remove volunteers from team", async () => {
      const context = {
        id: teamCreatedWithVolunteers.id,
      };

      const res = await RemoveVolunteersFromTeam.run(context);
      const relationsFromDatabase = await teamVolunteers.Model.findAll();
      const teamFromDatabase = await teams.Model.findOne({
        where: { name: teamCreatedWithVolunteers.name },
        include: volunteers.Model,
      });

      expect(res.volunteerIds).to.eql([]);
      expect(relationsFromDatabase.length).to.eq(0);
      expect(teamFromDatabase.volunteers).to.eql([]);
    });
  });

  describe("When team has no volunteers", () => {
    it("just does nothing", async () => {
      const context = {
        id: teamCreatedWithoutVolunteers.id,
      };

      const res = await RemoveVolunteersFromTeam.run(context);
      const teamFromDatabase = await teams.Model.findOne({
        where: { name: teamCreatedWithoutVolunteers.name },
        include: volunteers.Model,
      });

      expect(res.volunteerIds).to.eql([]);
      expect(teamFromDatabase.volunteers).to.eql([]);
    });
  });

  after(async () => {
    await teamVolunteers.Model.destroy({ where: {} });
    await teams.Model.destroy({ where: {} });
    await volunteers.Model.destroy({ where: {} });
  });
});
