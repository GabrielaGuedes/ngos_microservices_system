/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const RemoveEmployeesFromArea = require("../../interactors/remove-employees-from-area");
const areas = require("../../models/areas");
const employees = require("../../models/employees");
const areaEmployees = require("../../models/area-employees");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let areaCreatedWithEmployees = {};
let areaCreatedWithoutEmployees = {};

describe("RemoveEmployeesFromArea", () => {
  beforeEach(async () => {
    await areaEmployees.Model.destroy({ where: {} });
    await areas.Model.destroy({ where: {} });
    await employees.Model.destroy({ where: {} });

    areaCreatedWithEmployees = await areas.Model.create(
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

    areaCreatedWithoutEmployees = await areas.Model.create({
      name: "Area without employees",
      description: "no more info",
    });
  });

  describe("When context passed is correct", () => {
    it("remove employees from area", async () => {
      const context = {
        id: areaCreatedWithEmployees.id,
      };

      const res = await RemoveEmployeesFromArea.run(context);
      const relationsFromDatabase = await areaEmployees.Model.findAll();
      const areaFromDatabase = await areas.Model.findOne({
        where: { name: areaCreatedWithEmployees.name },
        include: employees.Model,
      });

      expect(res.employeeIds).to.eql([]);
      expect(relationsFromDatabase.length).to.eq(0);
      expect(areaFromDatabase.employees).to.eql([]);
    });
  });

  describe("When area has no employees", () => {
    it("just does nothing", async () => {
      const context = {
        id: areaCreatedWithoutEmployees.id,
      };

      const res = await RemoveEmployeesFromArea.run(context);
      const areaFromDatabase = await areas.Model.findOne({
        where: { name: areaCreatedWithoutEmployees.name },
        include: employees.Model,
      });

      expect(res.employeeIds).to.eql([]);
      expect(areaFromDatabase.employees).to.eql([]);
    });
  });

  after(async () => {
    await areaEmployees.Model.destroy({ where: {} });
    await areas.Model.destroy({ where: {} });
    await employees.Model.destroy({ where: {} });
  });
});
