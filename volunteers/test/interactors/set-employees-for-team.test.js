/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const SetEmployeesForTeam = require("../../interactors/set-employees-for-team");
const employees = require("../../models/employees");
const teams = require("../../models/teams");
const teamEmployees = require("../../models/team-employees");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let team = {};
let employeesCreated = [];

describe("SetEmployeesForTeam", () => {
  beforeEach(async () => {
    await teamEmployees.Model.destroy({ where: {} });
    await employees.Model.destroy({ where: {} });
    await teams.Model.destroy({ where: {} });

    const newEmployees = [];
    team = await teams.Model.create({
      name: "Team 1",
      description: "Team 1 very cool",
    });
    newEmployees.push(
      await employees.Model.create({
        name: "Base employee 1",
        address: "Base Street, 24",
        city: "Sao Paulo",
        state: "SP",
        country: "Brazil",
        occupation: "Software Engineer",
        birthDate: "1990-01-01",
        hireDate: "2020-01-01",
        phone: 5511999999999,
        email: "set_employee_for_team_test_1@example.com",
        additionalInfo: "no more info",
      })
    );
    newEmployees.push(
      await employees.Model.create({
        name: "Base employee 2",
        address: "Base Street, 24",
        city: "Sao Paulo",
        state: "SP",
        country: "Brazil",
        occupation: "Software Engineer",
        birthDate: "1990-01-01",
        hireDate: "2020-01-01",
        phone: 5511999999999,
        email: "set_employee_for_team_test_2@example.com",
        additionalInfo: "no more info",
      })
    );
    employeesCreated = newEmployees;
  });

  describe("When context passed is correct", () => {
    it("adds employees to team", async () => {
      const context = {
        team,
        employeeIds: [employeesCreated[0].id],
      };

      const res = await SetEmployeesForTeam.run(context);
      const relationsFromDatabase = await teamEmployees.Model.findAll();

      expect(res.team.dataValues).to.have.own.property("employeeIds");
      expect(res.team.dataValues.employeeIds).to.have.same.members([
        employeesCreated[0].id,
      ]);
      expect(relationsFromDatabase.length).to.eq(1);
    });
  });

  describe("When adding more than 1 employee", () => {
    it("add all the employees", async () => {
      const context = {
        team,
        employeeIds: employeesCreated.map((employee) => employee.id),
      };

      const res = await SetEmployeesForTeam.run(context);
      const relationsFromDatabase = await teamEmployees.Model.findAll();

      expect(res.team.dataValues).to.have.own.property("employeeIds");
      expect(res.team.dataValues.employeeIds).to.have.same.members(
        employeesCreated.map((employee) => employee.id)
      );
      expect(relationsFromDatabase.length).to.eq(employeesCreated.length);
    });
  });

  describe("When array is empty", () => {
    it("doesn't add employees", async () => {
      const context = {
        team,
        employeeIds: [],
      };

      const res = await SetEmployeesForTeam.run(context);
      const relationsFromDatabase = await teamEmployees.Model.findAll();

      expect(res.team.dataValues).to.have.own.property("employeeIds");
      expect(res.team.dataValues.employeeIds).to.have.same.members([]);
      expect(relationsFromDatabase.length).to.eq(0);
    });
  });

  after(async () => {
    await teamEmployees.Model.destroy({ where: {} });
    await employees.Model.destroy({ where: {} });
    await employees.Model.destroy({ where: {} });
  });
});
