/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const employees = require("../../models/employees");
const teams = require("../../models/teams");
const teamEmployees = require("../../models/team-employees");
const CreateTeamOrganizer = require("../../interactors/create-team-organizer");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let employeesCreated = [];

const teamInfo = {
  name: "Team 1",
  description: "Team 1 very cool",
};

describe("CreateTeamOrganizer", () => {
  beforeEach(async () => {
    await teamEmployees.Model.destroy({ where: {} });
    await employees.Model.destroy({ where: {} });
    await teams.Model.destroy({ where: {} });

    const newEmployees = [];
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
        email: "create_team_organizer_1@example.com",
        additionalInfo: "no more info",
      })
    );
    newEmployees.push(
      await employees.Model.create({
        name: "Base employee",
        address: "Base Street, 24",
        city: "Sao Paulo",
        state: "SP",
        country: "Brazil",
        occupation: "Software Engineer",
        birthDate: "1990-01-01",
        hireDate: "2020-01-01",
        phone: 5511999999999,
        email: "create_team_organizer_2@example.com",
        additionalInfo: "no more info",
      })
    );
    employeesCreated = newEmployees;
  });

  describe("When context passed is correct", () => {
    it("creates team with employees", async () => {
      const employeeIds = employeesCreated.map((employee) => employee.id);
      const context = {
        teamInfo,
        employeeIds,
      };

      const res = await CreateTeamOrganizer.run(context);
      const teamsRelationFromDatabase = await teamEmployees.Model.findAll();
      const teamsFromDatabase = await teams.Model.findAll();

      expect(res.team.dataValues).to.have.own.property("employeeIds");
      expect(teamsFromDatabase.length).to.eq(1);
      expect(res.team.id).to.eq(teamsFromDatabase[0].id);
      expect(res.team.dataValues.employeeIds).to.have.same.members(employeeIds);
      expect(teamsRelationFromDatabase.length).to.eq(employeeIds.length);
    });
  });

  describe("When employeeIds doesn't exist", () => {
    it("doesn't create team", async () => {
      const employeeIds = employeesCreated.map((employee) => employee.id + 6);
      const context = {
        teamInfo,
        employeeIds,
      };

      await CreateTeamOrganizer.run(context).catch(async (err) => {
        expect(err).to.be.an("error");
        const teamsRelationFromDatabase = await teamEmployees.Model.findAll();
        const teamsFromDatabase = await teams.Model.findAll();

        expect(teamsFromDatabase.length).to.eq(0);
        expect(teamsRelationFromDatabase.length).to.eq(0);
      });
    });
  });

  after(async () => {
    await teamEmployees.Model.destroy({ where: {} });
    await employees.Model.destroy({ where: {} });
    await teams.Model.destroy({ where: {} });
  });
});
