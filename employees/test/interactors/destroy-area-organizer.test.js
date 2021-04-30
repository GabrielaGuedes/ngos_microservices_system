/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const DestroyAreaOrganizer = require("../../interactors/destroy-area-organizer");
const areas = require("../../models/areas");
const employees = require("../../models/employees");
const areaEmployees = require("../../models/area-employees");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let areaWithEmployees = {};
let areaWithNothing = {};

describe("DestroyAreaOrganizer", () => {
  beforeEach(async () => {
    await areaEmployees.Model.destroy({ where: {} });
    await areas.Model.destroy({ where: {} });
    await employees.Model.destroy({ where: {} });

    areaWithEmployees = await areas.Model.create(
      {
        name: "Area with employees",
        description: "Just a cool area",
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

    areaWithNothing = await areas.Model.create({
      name: "Area without employees",
      description: "no more info",
    });
  });

  describe("When area has employees", () => {
    it("removes relations and destroys area", async () => {
      const context = {
        id: areaWithEmployees.id,
      };

      const res = await DestroyAreaOrganizer.run(context);
      const employeeRelationsFromDatabase = await areaEmployees.Model.findAll({
        where: { areaId: areaWithEmployees.id },
      });
      const areaFromDatabase = await areas.Model.findAll({
        where: { name: areaWithEmployees.name },
      });

      expect(res.employeeIds).to.eql([]);
      expect(res.success).to.eql(true);
      expect(employeeRelationsFromDatabase.length).to.eq(0);
      expect(areaFromDatabase).to.eql([]);
    });
  });

  describe("When area has nothing", () => {
    it("destroys area", async () => {
      const context = {
        id: areaWithNothing.id,
      };

      const res = await DestroyAreaOrganizer.run(context);
      const areaFromDatabase = await areas.Model.findAll({
        where: { name: areaWithNothing.name },
      });

      expect(res.success).to.eql(true);
      expect(areaFromDatabase).to.eql([]);
    });
  });

  after(async () => {
    await areaEmployees.Model.destroy({ where: {} });
    await areas.Model.destroy({ where: {} });
    await employees.Model.destroy({ where: {} });
  });
});
