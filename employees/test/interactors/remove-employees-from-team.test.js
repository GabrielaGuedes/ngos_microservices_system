/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const RemoveEmployeesFromTeam = require("../../interactors/remove-employees-from-team");
const teams = require("../../models/teams");
const employees = require("../../models/employees");
const teamEmployees = require("../../models/team-employees");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let teamCreatedWithEmployees = {};
let teamCreatedWithoutEmployees = {};

describe("RemoveEmployeesFromTeam", () => {
  beforeEach(async () => {
    await teamEmployees.Model.destroy({ where: {} });
    await teams.Model.destroy({ where: {} });
    await employees.Model.destroy({ where: {} });

    teamCreatedWithEmployees = await teams.Model.create(
      {
        name: "Team with employees",
        description: "Just a cool team",
        employees: [
          {
            name: "Base employee 1",
            address: "Base Street, 24",
            city: "Sao Paulo",
            state: "SP",
            country: "Brazil",
            occupation: "Software Engineer",
            birthDate: "1990-01-01",
            hireDate: "2020-01-01",
            phone: 5511999999999,
            email: "employee_1@example.com",
            additionalInfo: "no more info",
          },
          {
            name: "Base employee 2",
            address: "Base Street, 24",
            city: "Sao Paulo",
            state: "SP",
            country: "Brazil",
            occupation: "Software Engineer",
            birthDate: "1990-01-01",
            hireDate: "2020-01-01",
            phone: 5511999999999,
            email: "employee_2@example.com",
            additionalInfo: "no more info",
          },
        ],
      },
      {
        include: employees.Model,
      }
    );

    teamCreatedWithoutEmployees = await teams.Model.create({
      name: "Team without employees",
      description: "no more info",
    });
  });

  describe("When context passed is correct", () => {
    it("remove employees from team", async () => {
      const context = {
        id: teamCreatedWithEmployees.id,
      };

      const res = await RemoveEmployeesFromTeam.run(context);
      const relationsFromDatabase = await teamEmployees.Model.findAll();
      const teamFromDatabase = await teams.Model.findOne({
        where: { name: teamCreatedWithEmployees.name },
        include: employees.Model,
      });

      expect(res.employeeIds).to.eql([]);
      expect(relationsFromDatabase.length).to.eq(0);
      expect(teamFromDatabase.employees).to.eql([]);
    });
  });

  describe("When team has no employees", () => {
    it("just does nothing", async () => {
      const context = {
        id: teamCreatedWithoutEmployees.id,
      };

      const res = await RemoveEmployeesFromTeam.run(context);
      const teamFromDatabase = await teams.Model.findOne({
        where: { name: teamCreatedWithoutEmployees.name },
        include: employees.Model,
      });

      expect(res.employeeIds).to.eql([]);
      expect(teamFromDatabase.employees).to.eql([]);
    });
  });

  after(async () => {
    await teamEmployees.Model.destroy({ where: {} });
    await teams.Model.destroy({ where: {} });
    await employees.Model.destroy({ where: {} });
  });
});
