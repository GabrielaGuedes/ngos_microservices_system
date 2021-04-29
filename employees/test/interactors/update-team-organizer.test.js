/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const employees = require("../../models/employees");
const teams = require("../../models/teams");
const teamEmployees = require("../../models/team-employees");
const UpdateTeamOrganizer = require("../../interactors/update-team-organizer");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let employeesCreated = [];
let teamCreatedWithEmployees = {};

describe("UpdateTeamOrganizer", () => {
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
    teamCreatedWithEmployees = await teams.Model.create(
      {
        name: "Team 1",
        description: "Team 1 very cool",
        employees: [
          {
            name: "Base employee For team 1",
            address: "Base Street, 24",
            city: "Sao Paulo",
            state: "SP",
            country: "Brazil",
            occupation: "Software Engineer",
            birthDate: "1990-01-01",
            hireDate: "2020-01-01",
            phone: 5511999999999,
            email: "employee_for_team_1@example.com",
            additionalInfo: "no more info",
          },
        ],
      },
      {
        include: employees.Model,
      }
    );
  });

  describe("When context passed is correct", () => {
    it("updates the team with new employees", async () => {
      const employeeIds = employeesCreated.map((employee) => employee.id);
      const newDescription = "Brand new description here";
      const context = {
        team: teamCreatedWithEmployees,
        teamInfo: {
          description: newDescription,
        },
        employeeIds,
      };

      const res = await UpdateTeamOrganizer.run(context);
      const teamsRelationFromDatabase = await teamEmployees.Model.findAll();
      const teamsFromDatabase = await teams.Model.findAll({
        include: employees.Model,
      });

      expect(res.team.dataValues).to.have.own.property("employeeIds");
      expect(teamsFromDatabase.length).to.eq(1);
      expect(teamsFromDatabase[0].description).to.eq(newDescription);
      expect(res.team.dataValues.employeeIds).to.have.same.members(employeeIds);
      expect(teamsRelationFromDatabase.length).to.eq(employeeIds.length);
      expect(
        teamsFromDatabase[0].employees.map((emp) => emp.id)
      ).to.have.same.members(employeeIds);
    });
  });

  after(async () => {
    await teamEmployees.Model.destroy({ where: {} });
    await employees.Model.destroy({ where: {} });
    await teams.Model.destroy({ where: {} });
  });
});
