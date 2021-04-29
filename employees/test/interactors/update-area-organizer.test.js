/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const employees = require("../../models/employees");
const areas = require("../../models/areas");
const areaEmployees = require("../../models/area-employees");
const UpdateAreaOrganizer = require("../../interactors/update-area-organizer");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let employeesCreated = [];
let areaCreatedWithEmployees = {};

describe("UpdateAreaOrganizer", () => {
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
    areaCreatedWithEmployees = await areas.Model.create(
      {
        name: "Area 1",
        description: "Area 1 very cool",
        employees: [
          {
            name: "Base employee For area 1",
            address: "Base Street, 24",
            city: "Sao Paulo",
            state: "SP",
            country: "Brazil",
            occupation: "Software Engineer",
            birthDate: "1990-01-01",
            hireDate: "2020-01-01",
            phone: 5511999999999,
            email: "employee_for_area_1@example.com",
            additionalInfo: "no more info",
          },
        ],
      },
      {
        include: employees.Model,
      }
    );
  });

  describe("When context passed is correct", () => {
    it("updates the area with new employees", async () => {
      const employeeIds = employeesCreated.map((employee) => employee.id);
      const newDescription = "Brand new description here";
      const context = {
        area: areaCreatedWithEmployees,
        areaInfo: {
          description: newDescription,
        },
        employeeIds,
      };

      const res = await UpdateAreaOrganizer.run(context);
      const areasRelationFromDatabase = await areaEmployees.Model.findAll();
      const areasFromDatabase = await areas.Model.findAll({
        include: employees.Model,
      });

      expect(res.area.dataValues).to.have.own.property("employeeIds");
      expect(areasFromDatabase.length).to.eq(1);
      expect(areasFromDatabase[0].description).to.eq(newDescription);
      expect(res.area.dataValues.employeeIds).to.have.same.members(employeeIds);
      expect(areasRelationFromDatabase.length).to.eq(employeeIds.length);
      expect(
        areasFromDatabase[0].employees.map((emp) => emp.id)
      ).to.have.same.members(employeeIds);
    });
  });

  after(async () => {
    await areaEmployees.Model.destroy({ where: {} });
    await employees.Model.destroy({ where: {} });
    await areas.Model.destroy({ where: {} });
  });
});
