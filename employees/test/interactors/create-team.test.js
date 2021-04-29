/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const CreateTeam = require("../../interactors/create-team");
const teams = require("../../models/teams");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

const baseTeam = {
  name: "Base team",
  description: "cool team",
};

describe("CreateTeam", () => {
  before(async () => {
    await teams.Model.destroy({ where: {} });
    await teams.Model.create(baseTeam);
  });

  describe("When context passed is correct", () => {
    it("creates an team", async () => {
      const context = {
        name: "Correct team example",
        description: "",
      };

      const res = await CreateTeam.run({ teamInfo: context });
      const teamFromDatabase = await teams.Model.findOne({
        where: {
          name: context.name,
        },
      });

      expect(res).to.have.own.property("team");
      expect(res.team.id).to.eq(teamFromDatabase.id);
      expect(teamFromDatabase.name).to.eq(context.name);
      expect(teamFromDatabase.description).to.eq(context.description);
    });
  });

  describe("When name from context is already in use", () => {
    it("doesn't create an team", async () => {
      const context = baseTeam;
      const initialTeams = await teams.Model.findAll();

      const res = await CreateTeam.run({ teamInfo: context })
        .then((result) => result)
        .catch((error) => error);

      const teamsFromDatabase = await teams.Model.findAll();

      expect(res).to.be.an("error");
      expect(teamsFromDatabase.length).to.eq(initialTeams.length);
    });
  });

  after(async () => {
    await teams.Model.destroy({ where: {} });
  });
});
