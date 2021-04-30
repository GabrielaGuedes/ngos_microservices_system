/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const employees = require("../../models/employees");
const areas = require("../../models/areas");
const areaEmployees = require("../../models/area-employees");
const CreateAreaOrganizer = require("../../interactors/create-area-organizer");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let employeesCreated = [];

const areaInfo = {
  name: "Area 1",
  description: "Area 1 very cool",
};

describe("CreateAreaOrganizer", () => {
  beforeEach(async () => {
    await areaEmployees.Model.destroy({ where: {} });
    await employees.Model.destroy({ where: {} });
    await areas.Model.destroy({ where: {} });

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
        email: "create_area_organizer_1@example.com",
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
        email: "create_area_organizer_2@example.com",
        additionalInfo: "no more info",
      })
    );
    employeesCreated = newEmployees;
  });

  describe("When context passed is correct", () => {
    it("creates area with employees", async () => {
      const employeeIds = employeesCreated.map((employee) => employee.id);
      const context = {
        areaInfo,
        employeeIds,
      };

      const res = await CreateAreaOrganizer.run(context);
      const areasRelationFromDatabase = await areaEmployees.Model.findAll();
      const areasFromDatabase = await areas.Model.findAll();

      expect(res.area.dataValues).to.have.own.property("employeeIds");
      expect(areasFromDatabase.length).to.eq(1);
      expect(res.area.id).to.eq(areasFromDatabase[0].id);
      expect(res.area.dataValues.employeeIds).to.have.same.members(employeeIds);
      expect(areasRelationFromDatabase.length).to.eq(employeeIds.length);
    });
  });

  describe("When employeeIds doesn't exist", () => {
    it("doesn't create area", async () => {
      const employeeIds = employeesCreated.map((employee) => employee.id + 6);
      const context = {
        areaInfo,
        employeeIds,
      };

      await CreateAreaOrganizer.run(context).catch(async (err) => {
        expect(err).to.be.an("error");
        const areasRelationFromDatabase = await areaEmployees.Model.findAll();
        const areasFromDatabase = await areas.Model.findAll();

        expect(areasFromDatabase.length).to.eq(0);
        expect(areasRelationFromDatabase.length).to.eq(0);
      });
    });
  });

  after(async () => {
    await areaEmployees.Model.destroy({ where: {} });
    await employees.Model.destroy({ where: {} });
    await areas.Model.destroy({ where: {} });
  });
});
