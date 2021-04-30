/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const volunteers = require("../../models/volunteers");
const teams = require("../../models/teams");
const teamVolunteers = require("../../models/team-volunteers");
const DestroyTeam = require("../../interactors/destroy-team");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let teamWithRelation = {};
let teamToBeDestroyed = {};

describe("DestroyTeam", () => {
  beforeEach(async () => {
    await teamVolunteers.Model.destroy({ where: {} });
    await volunteers.Model.destroy({ where: {} });
    await teams.Model.destroy({ where: {} });

    teamWithRelation = await teams.Model.create(
      {
        name: "Team with relations",
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

    teamToBeDestroyed = await teams.Model.create({
      name: "Team to be destroyed",
      description: "no more info",
    });
  });

  describe("When context passed is correct", () => {
    it("destroys the team", async () => {
      const context = {
        id: teamToBeDestroyed.id,
      };

      const res = await DestroyTeam.run(context);
      const teamsFromDatabase = await teams.Model.findAll({
        where: { name: teamToBeDestroyed.name },
      });

      expect(res.success).to.eql(true);
      expect(teamsFromDatabase).to.eql([]);
    });
  });

  describe("When team has relations", () => {
    it("cant destroy the team", async () => {
      const context = {
        id: teamWithRelation.id,
      };

      await DestroyTeam.run(context).catch(async (err) => {
        const teamFromDatabase = await teams.Model.findOne({
          where: { name: teamWithRelation.name },
        });

        expect(err).to.be.an("error");
        expect(teamFromDatabase.id).to.eq(teamWithRelation.id);
      });
    });
  });

  after(async () => {
    await teamVolunteers.Model.destroy({ where: {} });
    await volunteers.Model.destroy({ where: {} });
    await teams.Model.destroy({ where: {} });
  });
});
