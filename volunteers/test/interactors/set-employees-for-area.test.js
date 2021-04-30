/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const SetEmployeesForArea = require("../../interactors/set-employees-for-area");
const employees = require("../../models/employees");
const areas = require("../../models/areas");
const areaEmployees = require("../../models/area-employees");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let area = {};
let employeesCreated = [];

describe("SetEmployeesForArea", () => {
  beforeEach(async () => {
    await areaEmployees.Model.destroy({ where: {} });
    await employees.Model.destroy({ where: {} });
    await areas.Model.destroy({ where: {} });

    const newEmployees = [];
    area = await areas.Model.create({
      name: "Area 1",
      description: "Area 1 very cool",
    });
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
        email: "set_employee_for_area_test_1@example.com",
        additionalInfo: "no more info",
      })
    );
    newEmployees.push(
      await employees.Model.create({
        name: "Base employee 2",
        address: "Base Street, 24",
        city: "Sao Paulo",
        state: "SP",
        country: "Brazil",
        occupation: "Software Engineer",
        birthDate: "1990-01-01",
        hireDate: "2020-01-01",
        phone: 5511999999999,
        email: "set_employee_for_area_test_2@example.com",
        additionalInfo: "no more info",
      })
    );
    employeesCreated = newEmployees;
  });

  describe("When context passed is correct", () => {
    it("adds employees to area", async () => {
      const context = {
        area,
        employeeIds: [employeesCreated[0].id],
      };

      const res = await SetEmployeesForArea.run(context);
      const relationsFromDatabase = await areaEmployees.Model.findAll();

      expect(res.area.dataValues).to.have.own.property("employeeIds");
      expect(res.area.dataValues.employeeIds).to.have.same.members([
        employeesCreated[0].id,
      ]);
      expect(relationsFromDatabase.length).to.eq(1);
    });
  });

  describe("When adding more than 1 employee", () => {
    it("add all the employees", async () => {
      const context = {
        area,
        employeeIds: employeesCreated.map((employee) => employee.id),
      };

      const res = await SetEmployeesForArea.run(context);
      const relationsFromDatabase = await areaEmployees.Model.findAll();

      expect(res.area.dataValues).to.have.own.property("employeeIds");
      expect(res.area.dataValues.employeeIds).to.have.same.members(
        employeesCreated.map((employee) => employee.id)
      );
      expect(relationsFromDatabase.length).to.eq(employeesCreated.length);
    });
  });

  describe("When array is empty", () => {
    it("doesn't add employees", async () => {
      const context = {
        area,
        employeeIds: [],
      };

      const res = await SetEmployeesForArea.run(context);
      const relationsFromDatabase = await areaEmployees.Model.findAll();

      expect(res.area.dataValues).to.have.own.property("employeeIds");
      expect(res.area.dataValues.employeeIds).to.have.same.members([]);
      expect(relationsFromDatabase.length).to.eq(0);
    });
  });

  after(async () => {
    await areaEmployees.Model.destroy({ where: {} });
    await employees.Model.destroy({ where: {} });
    await employees.Model.destroy({ where: {} });
  });
});
