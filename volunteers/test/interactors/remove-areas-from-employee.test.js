/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const RemoveAreasFromEmployee = require("../../interactors/remove-areas-from-employee");
const employees = require("../../models/employees");
const areas = require("../../models/areas");
const areaEmployees = require("../../models/area-employees");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let employeeCreatedWithAreas = {};
let employeeCreatedWithoutAreas = {};

describe("RemoveAreasFromEmployee", () => {
  beforeEach(async () => {
    await areaEmployees.Model.destroy({ where: {} });
    await employees.Model.destroy({ where: {} });
    await areas.Model.destroy({ where: {} });

    employeeCreatedWithAreas = await employees.Model.create(
      {
        name: "Base employee",
        address: "Base Street, 24",
        city: "Sao Paulo",
        state: "SP",
        country: "Brazil",
        occupation: "Software Engineer",
        birthDate: "1990-01-01",
        hireDate: "2020-01-01",
        phone: 5511999999999,
        email: "remove_areas_test@example.com",
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

    employeeCreatedWithoutAreas = await employees.Model.create({
      name: "Base employee without area",
      address: "Base Street, 24",
      city: "Sao Paulo",
      state: "SP",
      country: "Brazil",
      occupation: "Software Engineer",
      birthDate: "1990-01-01",
      hireDate: "2020-01-01",
      phone: 5511999999999,
      email: "without_areas@example.com",
      additionalInfo: "no more info",
    });
  });

  describe("When context passed is correct", () => {
    it("remove areas from employee", async () => {
      const context = {
        id: employeeCreatedWithAreas.id,
      };

      const res = await RemoveAreasFromEmployee.run(context);
      const relationsFromDatabase = await areaEmployees.Model.findAll();
      const employeeFromDatabase = await employees.Model.findOne({
        where: { email: employeeCreatedWithAreas.email },
        include: areas.Model,
      });

      expect(res.areaIds).to.eql([]);
      expect(relationsFromDatabase.length).to.eq(0);
      expect(employeeFromDatabase.areas).to.eql([]);
    });
  });

  describe("When employee has no areas", () => {
    it("just does nothing", async () => {
      const context = {
        id: employeeCreatedWithoutAreas.id,
      };

      const res = await RemoveAreasFromEmployee.run(context);
      const employeeFromDatabase = await employees.Model.findOne({
        where: { email: employeeCreatedWithoutAreas.email },
        include: areas.Model,
      });

      expect(res.areaIds).to.eql([]);
      expect(employeeFromDatabase.areas).to.eql([]);
    });
  });

  after(async () => {
    await areaEmployees.Model.destroy({ where: {} });
    await employees.Model.destroy({ where: {} });
    await areas.Model.destroy({ where: {} });
  });
});
