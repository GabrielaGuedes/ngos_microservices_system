/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const AddTeams = require("../../interactors/add-teams");
const employees = require("../../models/employees");
const teams = require("../../models/teams");
const teamEmployees = require("../../models/team-employees");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let employee = {};
let teamsCreated = [];

describe("AddTeams", () => {
  beforeEach(async () => {
    await teamEmployees.Model.destroy({ where: {} });
    await employees.Model.destroy({ where: {} });
    await teams.Model.destroy({ where: {} });

    const newTeams = [];
    employee = await employees.Model.create({
      name: "Base employee",
      address: "Base Street, 24",
      city: "Sao Paulo",
      state: "SP",
      country: "Brazil",
      occupation: "Software Engineer",
      birthDate: "1990-01-01",
      hireDate: "2020-01-01",
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
    it("adds teams to employee", async () => {
      const context = {
        employee,
        teamIds: [teamsCreated[0].id],
      };

      const res = await AddTeams.run(context);
      const relationsFromDatabase = await teamEmployees.Model.findAll();

      expect(res.employee.dataValues).to.have.own.property("teamIds");
      expect(res.employee.dataValues.teamIds).to.have.same.members([
        teamsCreated[0].id,
      ]);
      expect(relationsFromDatabase.length).to.eq(1);
    });
  });

  describe("When adding more than 1 team", () => {
    it("add all the teams", async () => {
      const context = {
        employee,
        teamIds: teamsCreated.map((team) => team.id),
      };

      const res = await AddTeams.run(context);
      const relationsFromDatabase = await teamEmployees.Model.findAll();

      expect(res.employee.dataValues).to.have.own.property("teamIds");
      expect(res.employee.dataValues.teamIds).to.have.same.members(
        teamsCreated.map((team) => team.id)
      );
      expect(relationsFromDatabase.length).to.eq(teamsCreated.length);
    });
  });

  describe("When array is empty", () => {
    it("doesn't add teams", async () => {
      const context = {
        employee,
        teamIds: [],
      };

      const res = await AddTeams.run(context);
      const relationsFromDatabase = await teamEmployees.Model.findAll();

      expect(res.employee.dataValues).to.have.own.property("teamIds");
      expect(res.employee.dataValues.teamIds).to.have.same.members([]);
      expect(relationsFromDatabase.length).to.eq(0);
    });
  });

  after(async () => {
    await teamEmployees.Model.destroy({ where: {} });
    await employees.Model.destroy({ where: {} });
    await teams.Model.destroy({ where: {} });
  });
});
