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
const teamsCreated = [];

describe("AddTeams", () => {
  before(async () => {
    await teamEmployees.Model.destroy({ where: {} });
    await employees.Model.destroy({ where: {} });
    await teams.Model.destroy({ where: {} });

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
    teamsCreated.push(
      await teams.Model.create({
        name: "Area 1",
        description: "Area 1 very cool",
      })
    );
    teamsCreated.push(
      await teams.Model.create({
        name: "Area 2",
        description: "Area 2 not so cool",
      })
    );
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

  after(async () => {
    await teamEmployees.Model.destroy({ where: {} });
    await employees.Model.destroy({ where: {} });
    await teams.Model.destroy({ where: {} });
  });
});
