/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const employees = require("../../models/employees");
const areas = require("../../models/areas");
const areaEmployees = require("../../models/area-employees");
const DestroyEmployee = require("../../interactors/destroy-employee");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let employeeWithRelation = {};
let employeeToBeDestroyed = {};

describe("DestroyEmployee", () => {
  beforeEach(async () => {
    await areaEmployees.Model.destroy({ where: {} });
    await employees.Model.destroy({ where: {} });
    await areas.Model.destroy({ where: {} });

    employeeWithRelation = await employees.Model.create(
      {
        name: "Base employee With relation",
        address: "Base Street, 24",
        city: "Sao Paulo",
        state: "SP",
        country: "Brazil",
        occupation: "Software Engineer",
        birthDate: "1990-01-01",
        hireDate: "2020-01-01",
        phone: 5511999999999,
        email: "with_relation@example.com",
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
      },
      {
        include: areas.Model,
      }
    );

    employeeToBeDestroyed = await employees.Model.create({
      name: "Base employee to be destroyed",
      address: "Base Street, 24",
      city: "Sao Paulo",
      state: "SP",
      country: "Brazil",
      occupation: "Software Engineer",
      birthDate: "1990-01-01",
      hireDate: "2020-01-01",
      phone: 5511999999999,
      email: "to_be_destroyed@example.com",
      additionalInfo: "no more info",
    });
  });

  describe("When context passed is correct", () => {
    it("destroys the employee", async () => {
      const context = {
        id: employeeToBeDestroyed.id,
      };

      const res = await DestroyEmployee.run(context);
      const employeeFromDatabase = await employees.Model.findAll({
        where: { email: employeeToBeDestroyed.email },
      });

      expect(res.success).to.eql(true);
      expect(employeeFromDatabase).to.eql([]);
    });
  });

  describe("When employee has relations", () => {
    it("cant destroy the employee", async () => {
      const context = {
        id: employeeWithRelation.id,
      };

      await DestroyEmployee.run(context).catch(async (err) => {
        const employeeFromDatabase = await employees.Model.findOne({
          where: { email: employeeWithRelation.email },
        });

        expect(err).to.be.an("error");
        expect(employeeFromDatabase.id).to.eq(employeeWithRelation.id);
      });
    });
  });

  after(async () => {
    await areaEmployees.Model.destroy({ where: {} });
    await employees.Model.destroy({ where: {} });
    await areas.Model.destroy({ where: {} });
  });
});
