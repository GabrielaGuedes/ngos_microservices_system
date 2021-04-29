/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const UpdateEmployee = require("../../interactors/update-employee");
const employees = require("../../models/employees");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let createdEmployee = {};
let existentEmployee = {};

describe("UpdateEmployee", () => {
  beforeEach(async () => {
    await employees.Model.destroy({ where: {} });
    createdEmployee = await employees.Model.create({
      name: "Base employee",
      address: "Base Street, 24",
      city: "Sao Paulo",
      state: "SP",
      country: "Brazil",
      occupation: "Software Engineer",
      birthDate: "1990-01-01",
      hireDate: "2020-01-01",
      phone: 5511999999999,
      email: "created@example.com",
      additionalInfo: "no more info",
    });
    existentEmployee = await employees.Model.create({
      name: "Existent employee",
      address: "Existent Street, 24",
      city: "Sao Paulo",
      state: "SP",
      country: "Brazil",
      occupation: "Software Engineer",
      birthDate: "1990-01-01",
      hireDate: "2020-01-01",
      phone: 5511999999999,
      email: "existent@example.com",
      additionalInfo: "no more info",
    });
  });

  describe("When context passed is correct", () => {
    it("updates an employee", async () => {
      const newName = "New name for employee";
      const newAdditionalInfo = "Another info";
      const context = {
        employee: createdEmployee,
        employeeInfo: {
          name: newName,
          additionalInfo: newAdditionalInfo,
        },
      };

      const res = await UpdateEmployee.run(context);
      const employeeFromDatabase = await employees.Model.findOne({
        where: {
          email: createdEmployee.email,
        },
      });

      expect(res).to.have.own.property("employee");
      expect(res.employee.name).to.eq(employeeFromDatabase.name);
      expect(employeeFromDatabase.name).to.eq(newName);
      expect(res.employee.additionalInfo).to.eq(
        employeeFromDatabase.additionalInfo
      );
      expect(employeeFromDatabase.additionalInfo).to.eq(newAdditionalInfo);
    });
  });

  describe("When email from context is already in use", () => {
    it("doesn't update employee", async () => {
      const newName = "New name for employee";
      const newAdditionalInfo = "Another info";
      const repeatedEmail = existentEmployee.email;
      const context = {
        employee: createdEmployee,
        employeeInfo: {
          name: newName,
          additionalInfo: newAdditionalInfo,
          email: repeatedEmail,
        },
      };

      await UpdateEmployee.run(context).catch(async (error) => {
        const employeeFromDatabase = await employees.Model.findOne({
          where: { name: newName },
        });

        expect(error).to.be.an("error");
        expect(employeeFromDatabase).to.eq(null);
      });
    });
  });

  after(async () => {
    await employees.Model.destroy({ where: {} });
  });
});
