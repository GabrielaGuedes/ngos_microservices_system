/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const employees = require("../../models/employees");
const teams = require("../../models/teams");
const teamEmployees = require("../../models/team-employees");
const DestroyTeam = require("../../interactors/destroy-team");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let teamWithRelation = {};
let teamToBeDestroyed = {};

describe("DestroyTeam", () => {
  beforeEach(async () => {
    await teamEmployees.Model.destroy({ where: {} });
    await employees.Model.destroy({ where: {} });
    await teams.Model.destroy({ where: {} });

    teamWithRelation = await teams.Model.create(
      {
        name: "Team with relations",
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

    teamToBeDestroyed = await teams.Model.create({
      name: "Team to be destroyed",
      description: "no more info",
    });
  });

  describe("When context passed is correct", () => {
    it("destroys the team", async () => {
      const context = {
        id: teamToBeDestroyed.id,
      };

      const res = await DestroyTeam.run(context);
      const teamsFromDatabase = await teams.Model.findAll({
        where: { name: teamToBeDestroyed.name },
      });

      expect(res.success).to.eql(true);
      expect(teamsFromDatabase).to.eql([]);
    });
  });

  describe("When team has relations", () => {
    it("cant destroy the team", async () => {
      const context = {
        id: teamWithRelation.id,
      };

      await DestroyTeam.run(context).catch(async (err) => {
        const teamFromDatabase = await teams.Model.findOne({
          where: { name: teamWithRelation.name },
        });

        expect(err).to.be.an("error");
        expect(teamFromDatabase.id).to.eq(teamWithRelation.id);
      });
    });
  });

  after(async () => {
    await teamEmployees.Model.destroy({ where: {} });
    await employees.Model.destroy({ where: {} });
    await teams.Model.destroy({ where: {} });
  });
});
