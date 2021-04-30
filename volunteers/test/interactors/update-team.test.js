/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const UpdateTeam = require("../../interactors/update-team");
const teams = require("../../models/teams");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let createdTeam = {};
let existentTeam = {};

describe("UpdateTeam", () => {
  beforeEach(async () => {
    await teams.Model.destroy({ where: {} });
    createdTeam = await teams.Model.create({
      name: "Base team",
      description: "First team created",
    });
    existentTeam = await teams.Model.create({
      name: "Existent team",
      description: "this was already in the database",
    });
  });

  describe("When context passed is correct", () => {
    it("updates an team", async () => {
      const newName = "New name for team";
      const newDescription = "Another info";
      const context = {
        team: createdTeam,
        teamInfo: {
          name: newName,
          description: newDescription,
        },
      };

      const res = await UpdateTeam.run(context);
      const teamFromDatabase = await teams.Model.findOne({
        where: {
          name: createdTeam.name,
        },
      });

      expect(res).to.have.own.property("team");
      expect(res.team.name).to.eq(teamFromDatabase.name);
      expect(teamFromDatabase.name).to.eq(newName);
      expect(res.team.description).to.eq(teamFromDatabase.description);
      expect(teamFromDatabase.description).to.eq(newDescription);
    });
  });

  describe("When name from context is already in use", () => {
    it("doesn't update team", async () => {
      const newDescription = "Another info";
      const repeatedName = existentTeam.name;
      const context = {
        team: createdTeam,
        teamInfo: {
          description: newDescription,
          name: repeatedName,
        },
      };

      await UpdateTeam.run(context).catch(async (error) => {
        const teamFromDatabase = await teams.Model.findOne({
          where: { description: newDescription },
        });

        expect(error).to.be.an("error");
        expect(teamFromDatabase).to.eq(null);
      });
    });
  });

  after(async () => {
    await teams.Model.destroy({ where: {} });
  });
});
