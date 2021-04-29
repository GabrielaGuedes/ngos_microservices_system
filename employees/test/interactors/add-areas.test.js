/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const AddAreas = require("../../interactors/add-areas");
const employees = require("../../models/employees");
const areas = require("../../models/areas");
const areaEmployees = require("../../models/area-employees");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let employee = {};
let areasCreated = [];

describe("AddAreas", () => {
  beforeEach(async () => {
    await areaEmployees.Model.destroy({ where: {} });
    await employees.Model.destroy({ where: {} });
    await areas.Model.destroy({ where: {} });

    const newAreas = [];
    employee = await employees.Model.create({
      name: "Base employee",
      address: "Base Street, 24",
      city: "Sao Paulo",
      state: "SP",
      country: "Brazil",
      occupation: "Software Engineer",
      birthDate: "1990-01-01",
      hireDate: "2020-01-01",
      phone: 5511999999999,
      email: "add_area_test@example.com",
      additionalInfo: "no more info",
    });
    newAreas.push(
      await areas.Model.create({
        name: "Area 1",
        description: "Area 1 very cool",
      })
    );
    newAreas.push(
      await areas.Model.create({
        name: "Area 2",
        description: "Area 2 not so cool",
      })
    );
    areasCreated = newAreas;
  });
  describe("When context passed is correct", () => {
    it("adds areas to employee", async () => {
      const context = {
        employee,
        areaIds: [areasCreated[0].id],
      };

      const res = await AddAreas.run(context);
      const relationsFromDatabase = await areaEmployees.Model.findAll();

      expect(res.employee.dataValues).to.have.own.property("areaIds");
      expect(res.employee.dataValues.areaIds).to.have.same.members([
        areasCreated[0].id,
      ]);
      expect(relationsFromDatabase.length).to.eq(1);
    });
  });

  describe("When adding more than 1 area", () => {
    it("add all the areas", async () => {
      const context = {
        employee,
        areaIds: areasCreated.map((area) => area.id),
      };

      const res = await AddAreas.run(context);
      const relationsFromDatabase = await areaEmployees.Model.findAll();

      expect(res.employee.dataValues).to.have.own.property("areaIds");
      expect(res.employee.dataValues.areaIds).to.have.same.members(
        areasCreated.map((area) => area.id)
      );
      expect(relationsFromDatabase.length).to.eq(areasCreated.length);
    });
  });

  describe("When array is empty", () => {
    it("doesn't add areas", async () => {
      const context = {
        employee,
        areaIds: [],
      };

      const res = await AddAreas.run(context);
      const relationsFromDatabase = await areaEmployees.Model.findAll();

      expect(res.employee.dataValues).to.have.own.property("areaIds");
      expect(res.employee.dataValues.areaIds).to.have.same.members([]);
      expect(relationsFromDatabase.length).to.eq(0);
    });
  });

  after(async () => {
    await areaEmployees.Model.destroy({ where: {} });
    await employees.Model.destroy({ where: {} });
    await areas.Model.destroy({ where: {} });
  });
});
