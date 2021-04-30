/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const RemoveTeamsFromEmployee = require("../../interactors/remove-teams-from-employee");
const employees = require("../../models/employees");
const teams = require("../../models/teams");
const teamEmployees = require("../../models/team-employees");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let employeeCreatedWithTeams = {};
let employeeCreatedWithoutTeams = {};

describe("RemoveTeamsFromEmployee", () => {
  beforeEach(async () => {
    await teamEmployees.Model.destroy({ where: {} });
    await employees.Model.destroy({ where: {} });
    await teams.Model.destroy({ where: {} });

    employeeCreatedWithTeams = await employees.Model.create(
      {
        name: "Base employee",
        address: "Base Street, 24",
        city: "Sao Paulo",
        state: "SP",
        country: "Brazil",
        occupation: "Software Engineer",
        birthDate: "1990-01-01",
        hireDate: "2020-01-01",
        phone: 5511999999999,
        email: "remove_teams_test@example.com",
        additionalInfo: "no more info",
        teams: [
          {
            name: "Team 1",
            description: "Team 1 very cool",
          },
          {
            name: "Team 2",
            description: "Team 2 not so cool",
          },
        ],
      },
      {
        include: teams.Model,
      }
    );

    employeeCreatedWithoutTeams = await employees.Model.create({
      name: "Base employee without team",
      address: "Base Street, 24",
      city: "Sao Paulo",
      state: "SP",
      country: "Brazil",
      occupation: "Software Engineer",
      birthDate: "1990-01-01",
      hireDate: "2020-01-01",
      phone: 5511999999999,
      email: "without_teams@example.com",
      additionalInfo: "no more info",
    });
  });

  describe("When context passed is correct", () => {
    it("remove teams from employee", async () => {
      const context = {
        id: employeeCreatedWithTeams.id,
      };

      const res = await RemoveTeamsFromEmployee.run(context);
      const relationsFromDatabase = await teamEmployees.Model.findAll();
      const employeeFromDatabase = await employees.Model.findOne({
        where: { email: employeeCreatedWithTeams.email },
        include: teams.Model,
      });

      expect(res.teamIds).to.eql([]);
      expect(relationsFromDatabase.length).to.eq(0);
      expect(employeeFromDatabase.teams).to.eql([]);
    });
  });

  describe("When employee has no teams", () => {
    it("just does nothing", async () => {
      const context = {
        id: employeeCreatedWithoutTeams.id,
      };

      const res = await RemoveTeamsFromEmployee.run(context);
      const employeeFromDatabase = await employees.Model.findOne({
        where: { email: employeeCreatedWithoutTeams.email },
        include: teams.Model,
      });

      expect(res.teamIds).to.eql([]);
      expect(employeeFromDatabase.teams).to.eql([]);
    });
  });

  after(async () => {
    await teamEmployees.Model.destroy({ where: {} });
    await employees.Model.destroy({ where: {} });
    await teams.Model.destroy({ where: {} });
  });
});
