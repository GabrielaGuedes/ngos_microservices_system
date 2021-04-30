/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const DestroyEmployeeOrganizer = require("../../interactors/destroy-employee-organizer");
const employees = require("../../models/employees");
const areas = require("../../models/areas");
const teams = require("../../models/teams");
const areaEmployees = require("../../models/area-employees");
const teamEmployees = require("../../models/team-employees");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let employeeWithAreasAndTeams = {};
let employeeWithAreas = {};
let employeeWithTeams = {};
let employeeWithNothing = {};

describe("DestroyEmployeeOrganizer", () => {
  beforeEach(async () => {
    await areaEmployees.Model.destroy({ where: {} });
    await teamEmployees.Model.destroy({ where: {} });
    await employees.Model.destroy({ where: {} });
    await areas.Model.destroy({ where: {} });
    await teams.Model.destroy({ where: {} });

    employeeWithAreasAndTeams = await employees.Model.create(
      {
        name: "Base employee With Areas and Teams",
        address: "Base Street, 24",
        city: "Sao Paulo",
        state: "SP",
        country: "Brazil",
        occupation: "Software Engineer",
        birthDate: "1990-01-01",
        hireDate: "2020-01-01",
        phone: 5511999999999,
        email: "areas_and_teams@example.com",
        additionalInfo: "no more info",
        areas: [
          {
            name: "Area 1",
            description: "Area 1 very cool",
          },
          {
            name: "Area 2",
            description: "Area 2 not so cool",
          },
        ],
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
        include: [areas.Model, teams.Model],
      }
    );

    employeeWithAreas = await employees.Model.create(
      {
        name: "Base employee With Areas",
        address: "Base Street, 24",
        city: "Sao Paulo",
        state: "SP",
        country: "Brazil",
        occupation: "Software Engineer",
        birthDate: "1990-01-01",
        hireDate: "2020-01-01",
        phone: 5511999999999,
        email: "areas@example.com",
        additionalInfo: "no more info",
        areas: [
          {
            name: "Area 11",
            description: "Area 1 very cool",
          },
          {
            name: "Area 22",
            description: "Area 2 not so cool",
          },
        ],
      },
      {
        include: areas.Model,
      }
    );

    employeeWithTeams = await employees.Model.create(
      {
        name: "Base employee With Teams",
        address: "Base Street, 24",
        city: "Sao Paulo",
        state: "SP",
        country: "Brazil",
        occupation: "Software Engineer",
        birthDate: "1990-01-01",
        hireDate: "2020-01-01",
        phone: 5511999999999,
        email: "teams@example.com",
        additionalInfo: "no more info",
        teams: [
          {
            name: "Team 11",
            description: "Team 1 very cool",
          },
          {
            name: "Team 22",
            description: "Team 2 not so cool",
          },
        ],
      },
      {
        include: teams.Model,
      }
    );

    employeeWithNothing = await employees.Model.create({
      name: "Base employee with nothing",
      address: "Base Street, 24",
      city: "Sao Paulo",
      state: "SP",
      country: "Brazil",
      occupation: "Software Engineer",
      birthDate: "1990-01-01",
      hireDate: "2020-01-01",
      phone: 5511999999999,
      email: "with_nothing@example.com",
      additionalInfo: "no more info",
    });
  });

  describe("When employee has teams and areas", () => {
    it("removes relations and destroys employee", async () => {
      const context = {
        id: employeeWithAreasAndTeams.id,
      };

      const res = await DestroyEmployeeOrganizer.run(context);
      const areaRelationsFromDatabase = await areaEmployees.Model.findAll({
        where: { employeeId: employeeWithAreasAndTeams.id },
      });
      const teamRelationsFromDatabase = await teamEmployees.Model.findAll({
        where: { employeeId: employeeWithAreasAndTeams.id },
      });
      const employeeFromDatabase = await employees.Model.findAll({
        where: { email: employeeWithAreasAndTeams.email },
      });

      expect(res.areaIds).to.eql([]);
      expect(res.teamIds).to.eql([]);
      expect(res.success).to.eql(true);
      expect(areaRelationsFromDatabase.length).to.eq(0);
      expect(teamRelationsFromDatabase.length).to.eq(0);
      expect(employeeFromDatabase).to.eql([]);
    });
  });

  describe("When employee has teams", () => {
    it("removes relations and destroys employee", async () => {
      const context = {
        id: employeeWithTeams.id,
      };

      const res = await DestroyEmployeeOrganizer.run(context);
      const teamRelationsFromDatabase = await teamEmployees.Model.findAll({
        where: { employeeId: employeeWithTeams.id },
      });
      const employeeFromDatabase = await employees.Model.findAll({
        where: { email: employeeWithTeams.email },
      });

      expect(res.teamIds).to.eql([]);
      expect(res.success).to.eql(true);
      expect(teamRelationsFromDatabase.length).to.eq(0);
      expect(employeeFromDatabase).to.eql([]);
    });
  });

  describe("When employee has areas", () => {
    it("removes relations and destroys employee", async () => {
      const context = {
        id: employeeWithAreas.id,
      };

      const res = await DestroyEmployeeOrganizer.run(context);
      const areaRelationsFromDatabase = await areaEmployees.Model.findAll({
        where: { employeeId: employeeWithAreas.id },
      });
      const employeeFromDatabase = await employees.Model.findAll({
        where: { email: employeeWithAreas.email },
      });

      expect(res.areaIds).to.eql([]);
      expect(res.success).to.eql(true);
      expect(areaRelationsFromDatabase.length).to.eq(0);
      expect(employeeFromDatabase).to.eql([]);
    });
  });

  describe("When employee has nothing", () => {
    it("destroys employee", async () => {
      const context = {
        id: employeeWithNothing.id,
      };

      const res = await DestroyEmployeeOrganizer.run(context);
      const employeeFromDatabase = await employees.Model.findAll({
        where: { email: employeeWithNothing.email },
      });

      expect(res.success).to.eql(true);
      expect(employeeFromDatabase).to.eql([]);
    });
  });

  after(async () => {
    await areaEmployees.Model.destroy({ where: {} });
    await teamEmployees.Model.destroy({ where: {} });
    await employees.Model.destroy({ where: {} });
    await areas.Model.destroy({ where: {} });
    await teams.Model.destroy({ where: {} });
  });
});
