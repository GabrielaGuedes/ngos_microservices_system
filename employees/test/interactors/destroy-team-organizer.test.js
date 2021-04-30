/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const DestroyTeamOrganizer = require("../../interactors/destroy-team-organizer");
const teams = require("../../models/teams");
const employees = require("../../models/employees");
const teamEmployees = require("../../models/team-employees");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let teamWithEmployees = {};
let teamWithNothing = {};

describe("DestroyTeamOrganizer", () => {
  beforeEach(async () => {
    await teamEmployees.Model.destroy({ where: {} });
    await teams.Model.destroy({ where: {} });
    await employees.Model.destroy({ where: {} });

    teamWithEmployees = await teams.Model.create(
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

    teamWithNothing = await teams.Model.create({
      name: "Team without employees",
      description: "no more info",
    });
  });

  describe("When team has employees", () => {
    it("removes relations and destroys team", async () => {
      const context = {
        id: teamWithEmployees.id,
      };

      const res = await DestroyTeamOrganizer.run(context);
      const employeeRelationsFromDatabase = await teamEmployees.Model.findAll({
        where: { teamId: teamWithEmployees.id },
      });
      const teamFromDatabase = await teams.Model.findAll({
        where: { name: teamWithEmployees.name },
      });

      expect(res.employeeIds).to.eql([]);
      expect(res.success).to.eql(true);
      expect(employeeRelationsFromDatabase.length).to.eq(0);
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
    await teamEmployees.Model.destroy({ where: {} });
    await teams.Model.destroy({ where: {} });
    await employees.Model.destroy({ where: {} });
  });
});
