/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const employees = require("../../models/employees");
const teams = require("../../models/teams");
const areas = require("../../models/areas");
const teamEmployees = require("../../models/team-employees");
const areaEmployees = require("../../models/area-employees");
const CreateEmployeeOrganizer = require("../../interactors/create-employee-organizer");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

const teamsCreated = [];
const areasCreated = [];

const employeeInfo = {
  name: "Base employee",
  address: "Base Street, 24",
  city: "Sao Paulo",
  state: "SP",
  country: "Brazil",
  occupation: "Software Engineer",
  birthDate: "1990-01-01",
  hireDate: "2020-01-01",
  phone: 5511999999999,
  email: "create_employee_organizer@example.com",
  additionalInfo: "no more info",
};

describe("CreateEmployeeOrganizer", () => {
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
  });

  describe("When context passed is correct", () => {
    it("creates employee with teams and areas", async () => {
      const teamIds = teamsCreated.map((team) => team.id);
      const areaIds = areasCreated.map((area) => area.id);
      const context = {
        employeeInfo,
        teamIds,
        areaIds,
      };

      const res = await CreateEmployeeOrganizer.run(context);
      const teamsRelationFromDatabase = await teamEmployees.Model.findAll();
      const areasRelationFromDatabase = await areaEmployees.Model.findAll();
      const employeesFromDatabase = await employees.Model.findAll();

      expect(res.employee.dataValues).to.have.own.property("teamIds");
      expect(res.employee.dataValues).to.have.own.property("areaIds");
      expect(employeesFromDatabase.length).to.eq(1);
      expect(res.employee.id).to.eq(employeesFromDatabase[0].id);
      expect(res.employee.dataValues.teamIds).to.have.same.members(teamIds);
      expect(res.employee.dataValues.areaIds).to.have.same.members(areaIds);
      expect(teamsRelationFromDatabase.length).to.eq(teamIds.length);
      expect(areasRelationFromDatabase.length).to.eq(areaIds.length);
    });
  });

  describe("When teamIds doesn't exist", () => {
    it("doesn't create employee", async () => {
      const teamIds = teamsCreated.map((team) => team.id + 6);
      const areaIds = areasCreated.map((area) => area.id);
      const context = {
        employeeInfo,
        teamIds,
        areaIds,
      };

      await CreateEmployeeOrganizer.run(context).catch(async (err) => {
        expect(err).to.be.an("error");
        const teamsRelationFromDatabase = await teamEmployees.Model.findAll();
        const areasRelationFromDatabase = await areaEmployees.Model.findAll();
        const employeesFromDatabase = await employees.Model.findAll();

        expect(employeesFromDatabase.length).to.eq(0);
        expect(teamsRelationFromDatabase.length).to.eq(0);
        expect(areasRelationFromDatabase.length).to.eq(0);
      });
    });
  });

  describe("When areaIds doesn't exist", () => {
    it("doesn't create employee", async () => {
      const teamIds = teamsCreated.map((team) => team.id);
      const areaIds = areasCreated.map((area) => area.id + 6);
      const context = {
        employeeInfo,
        teamIds,
        areaIds,
      };

      await CreateEmployeeOrganizer.run(context).catch(async (err) => {
        expect(err).to.be.an("error");
        const teamsRelationFromDatabase = await teamEmployees.Model.findAll();
        const areasRelationFromDatabase = await areaEmployees.Model.findAll();
        const employeesFromDatabase = await employees.Model.findAll();

        expect(employeesFromDatabase.length).to.eq(0);
        expect(teamsRelationFromDatabase.length).to.eq(0);
        expect(areasRelationFromDatabase.length).to.eq(0);
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
