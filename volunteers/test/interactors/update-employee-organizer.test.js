/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const employees = require("../../models/employees");
const teams = require("../../models/teams");
const areas = require("../../models/areas");
const teamEmployees = require("../../models/team-employees");
const areaEmployees = require("../../models/area-employees");
const UpdateEmployeeOrganizer = require("../../interactors/update-employee-organizer");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

const teamsCreated = [];
const areasCreated = [];
let employeeCreatedWithArea = {};

describe("UpdateEmployeeOrganizer", () => {
  beforeEach(async () => {
    await teamEmployees.Model.destroy({ where: {} });
    await areaEmployees.Model.destroy({ where: {} });
    await employees.Model.destroy({ where: {} });
    await teams.Model.destroy({ where: {} });
    await areas.Model.destroy({ where: {} });

    teamsCreated.push(
      await teams.Model.create({
        name: "Team 1",
        description: "Team 1 very cool",
      })
    );
    teamsCreated.push(
      await teams.Model.create({
        name: "Team 2",
        description: "Team 2 not so cool",
      })
    );
    areasCreated.push(
      await areas.Model.create({
        name: "Area 1",
        description: "Area 1 very cool",
      })
    );
    areasCreated.push(
      await areas.Model.create({
        name: "Area 2",
        description: "Area 2 not so cool",
      })
    );
    employeeCreatedWithArea = await employees.Model.create(
      {
        name: "Employee Created",
        address: "Base Street, 24",
        city: "Sao Paulo",
        state: "SP",
        country: "Brazil",
        occupation: "Software Engineer",
        birthDate: "1990-01-01",
        hireDate: "2020-01-01",
        phone: 5511999999999,
        email: "employee_created@example.com",
        additionalInfo: "no more info",
        areas: [
          {
            name: "Existent Area",
            description: "Very cool",
            areaEmployees: {},
          },
        ],
      },
      {
        include: areas.Model,
      }
    );
  });

  describe("When context passed is correct", () => {
    it("updates the employee with new teams and areas", async () => {
      const teamIds = teamsCreated.map((team) => team.id);
      const areaIds = areasCreated.map((area) => area.id);
      const newName = "New name for employee";
      const newAdditionalInfo = "Another info";
      const context = {
        employee: employeeCreatedWithArea,
        employeeInfo: {
          name: newName,
          additionalInfo: newAdditionalInfo,
        },
        teamIds,
        areaIds,
      };

      const res = await UpdateEmployeeOrganizer.run(context);
      const teamsRelationFromDatabase = await teamEmployees.Model.findAll();
      const areasRelationFromDatabase = await areaEmployees.Model.findAll();
      const employeesFromDatabase = await employees.Model.findAll({
        include: [areas.Model, teams.Model],
      });

      expect(res.employee.dataValues).to.have.own.property("teamIds");
      expect(res.employee.dataValues).to.have.own.property("areaIds");
      expect(employeesFromDatabase.length).to.eq(1);
      expect(employeesFromDatabase[0].name).to.eq(newName);
      expect(employeesFromDatabase[0].additionalInfo).to.eq(newAdditionalInfo);
      expect(res.employee.dataValues.teamIds).to.have.same.members(teamIds);
      expect(res.employee.dataValues.areaIds).to.have.same.members(areaIds);
      expect(teamsRelationFromDatabase.length).to.eq(teamIds.length);
      expect(areasRelationFromDatabase.length).to.eq(areaIds.length);
      expect(
        employeesFromDatabase[0].areas.map((area) => area.id)
      ).to.have.same.members(areaIds);
      expect(
        employeesFromDatabase[0].teams.map((team) => team.id)
      ).to.have.same.members(teamIds);
    });
  });

  describe("When teamIds doesn't exist", () => {
    it("doesn't update the areas", async () => {
      const teamIds = teamsCreated.map((team) => team.id + 6);
      const areaIds = areasCreated.map((area) => area.id);
      const newName = "New name for employee";
      const newAdditionalInfo = "Another info";
      const context = {
        employee: employeeCreatedWithArea,
        employeeInfo: {
          name: newName,
          additionalInfo: newAdditionalInfo,
        },
        teamIds,
        areaIds,
      };

      await UpdateEmployeeOrganizer.run(context).catch(async (err) => {
        expect(err).to.be.an("error");
        const teamsRelationFromDatabase = await teamEmployees.Model.findAll();
        const areasRelationFromDatabase = await areaEmployees.Model.findAll();
        const employeesFromDatabase = await employees.Model.findAll({
          include: areas.Model,
        });

        expect(employeesFromDatabase.length).to.eq(1);
        expect(teamsRelationFromDatabase.length).to.eq(0);
        expect(areasRelationFromDatabase.length).to.eq(1);
        expect(
          employeesFromDatabase[0].areas.map((area) => area.id)
        ).to.have.same.members(
          employeeCreatedWithArea.areas.map((area) => area.id)
        );
      });
    });
  });

  after(async () => {
    await teamEmployees.Model.destroy({ where: {} });
    await areaEmployees.Model.destroy({ where: {} });
    await employees.Model.destroy({ where: {} });
    await teams.Model.destroy({ where: {} });
    await areas.Model.destroy({ where: {} });
  });
});
