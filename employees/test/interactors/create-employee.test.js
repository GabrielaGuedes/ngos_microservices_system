/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const CreateEmployee = require("../../interactors/create-employee");
const employees = require("../../models/employees");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

const baseEmployee = {
  name: "Base employee",
  address: "Base Street, 24",
  city: "Sao Paulo",
  state: "SP",
  country: "Brazil",
  occupation: "Software Engineer",
  birthDate: "1990-01-01",
  hireDate: "2020-01-01",
  phone: 5511999999999,
  email: "first@example.com",
  additionalInfo: "no more info",
};

describe("CreateEmployee", () => {
  before(async () => {
    await employees.Model.destroy({ where: {} });
    await employees.Model.create(baseEmployee);
  });

  describe("When context passed is correct", () => {
    it("creates an employee", async () => {
      const context = {
        name: "Correct example",
        address: "Base Street, 24",
        city: "Sao Paulo",
        state: "SP",
        country: "Brazil",
        occupation: "Software Engineer",
        birthDate: "1990-01-01",
        hireDate: "2020-01-01",
        phone: 5511999999999,
        email: "correct@example.com",
        additionalInfo: "no more info",
      };

      const res = await CreateEmployee.run({ employeeInfo: context });
      const employeeFromDatabase = await employees.Model.findOne({
        where: {
          email: context.email,
        },
      });

      expect(res).to.have.own.property("employee");
      expect(res.employee.id).to.eq(employeeFromDatabase.id);
      expect(employeeFromDatabase.email).to.eq(context.email);
      expect(employeeFromDatabase.name).to.eq(context.name);
    });
  });

  describe("When email from context is already in use", () => {
    it("doesn't create an employee", async () => {
      const context = baseEmployee;
      const initialEmployees = await employees.Model.findAll();

      const res = await CreateEmployee.run({ employeeInfo: context })
        .then((result) => result)
        .catch((error) => error);

      const employeesFromDatabase = await employees.Model.findAll();

      expect(res).to.be.an("error");
      expect(employeesFromDatabase.length).to.eq(initialEmployees.length);
    });
  });

  after(async () => {
    await employees.Model.destroy({ where: {} });
  });
});
