/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const chaiHttp = require("chai-http");
const Employee = require("../../models/employees");
const { getTokenForTests } = require("../../utils/get-token-for-tests");
require("../../index");

const { expect } = chai;
const should = chai.should();

chai.use(chaiHttp);

const employees = [];
let token = "";

before(async () => {
  token = await getTokenForTests();
  await Employee.Model.destroy({
    truncate: true,
  });
  employees.push(
    await Employee.Model.create({
      name: "Example name",
      address: "Any street, 123",
      city: "Sao Paulo",
      state: "SP",
      country: "Brazil",
      occupation: "Software Engineer",
      birthDate: "1990-01-01",
      hireDate: "2020-01-01",
      phone: 5511999999999,
      email: "example@test.com",
      additionalInfo: "I like to drink water",
    }).then((res) => res)
  );
  employees.push(
    await Employee.Model.create({
      name: "A Example name",
      address: "Any street, 123",
      city: "Paulo",
      state: "SP",
      country: "Brazil",
      occupation: "Data Engineer",
      birthDate: "1990-01-01",
      hireDate: "2020-01-01",
      phone: 5511999999999,
      email: "a_example@test.com",
      additionalInfo: "I like to drink water",
    }).then((res) => res)
  );
  employees.push(
    await Employee.Model.create({
      name: "B Example name",
      address: "Any street, 123",
      city: "Rio Branco",
      state: "AC",
      country: "Brazil",
      occupation: "Engineer",
      birthDate: "1990-01-01",
      hireDate: "2020-01-01",
      phone: 5511999999999,
      email: "b_example@test.com",
    }).then((res) => res)
  );
  employees.push(
    await Employee.Model.create({
      name: "C Example name",
      address: "Any street, 123",
      city: "City from Tuvalu",
      state: "TU",
      country: "Tuvalu",
      occupation: "Software Engineer",
      birthDate: "1990-01-01",
      hireDate: "2020-01-01",
      phone: 5511999999999,
      email: "c_example@test.com",
    }).then((res) => res)
  );
  employees.push(
    await Employee.Model.create({
      name: "D Example name",
      address: "Any street, 123",
      city: "Sao Paulo",
      state: "SP",
      country: "Brazil",
      occupation: "Marketing director",
      birthDate: "1990-01-01",
      hireDate: "2020-01-01",
      phone: 5511999999999,
      email: "d_example@test.com",
    }).then((res) => res)
  );
  employees.push(
    await Employee.Model.create({
      name: "E Example name",
      address: "Any street, 123",
      city: "Rio de janeiro",
      state: "RJ",
      country: "Brazil",
      occupation: "CEO",
      birthDate: "1990-01-01",
      hireDate: "2020-01-01",
      phone: 5511999999999,
      email: "e_example@test.com",
      additionalInfo: "I like to drink water",
    }).then((res) => res)
  );
});

describe("/GET Employees", () => {
  describe("When token is valid and there are no filters", () => {
    it("returns all employees ordered by name", async () => {
      const sortedEmployeesNames = employees
        .map((employee) => employee.name)
        .sort();
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/employees/")
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.should.be.a("array");
      expect(res.body.length).to.eq(employees.length);
      expect(res.body.map((employee) => employee.name)).to.eql(
        sortedEmployeesNames
      );
      expect(res.body[0].name).to.eql(sortedEmployeesNames[0]);
    });
  });

  describe("When token is invalid and there are no filters", () => {
    it("returns error", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/employees/")
        .set("x-access-token", "invalid token");

      res.should.have.status(500);
      res.body.should.not.be.a("array");
      expect(res.error.text).to.include("Failed");
    });
  });

  describe("When token is not passed and there are no filters", () => {
    it("returns unauthorized", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/employees/");

      res.should.have.status(401);
      res.body.should.not.be.a("array");
      expect(res.error.text).to.include("No");
      expect(res.error.text).to.include("provided");
    });
  });

  describe("When token is valid filtered by occupation", () => {
    it("returns some employees", async () => {
      const occupation = "Software Engineer";
      const employeesWithOccupation = employees.filter(
        (employee) => employee.occupation === occupation
      );
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/employees/")
        .query({ occupation })
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.should.be.a("array");
      expect(res.body.length).to.eq(employeesWithOccupation.length);
      expect(res.body.map((employee) => employee.id)).to.have.same.members(
        employeesWithOccupation.map((employee) => employee.id)
      );
    });
  });

  describe("When token is valid filtered by city", () => {
    it("returns some employees", async () => {
      const city = "Rio de janeiro";
      const employeesFromCity = employees.filter(
        (employee) => employee.city === city
      );
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/employees/")
        .query({ city })
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.should.be.a("array");
      expect(res.body.length).to.eq(employeesFromCity.length);
      expect(res.body.map((employee) => employee.id)).to.have.same.members(
        employeesFromCity.map((employee) => employee.id)
      );
    });
  });

  describe("When token is valid filtered by state", () => {
    it("returns some employees", async () => {
      const state = "SP";
      const employeesFromState = employees.filter(
        (employee) => employee.state === state
      );
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/employees/")
        .query({ state })
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.should.be.a("array");
      expect(res.body.length).to.eq(employeesFromState.length);
      expect(res.body.map((employee) => employee.id)).to.have.same.members(
        employeesFromState.map((employee) => employee.id)
      );
    });
  });
});

describe("/GET :id Employees", () => {
  describe("When token is valid and id exists", () => {
    it("returns the employee", async () => {
      const id = 2;
      const employee = employees.find((emp) => emp.id === id);
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get(`/api/employees/${id}`)
        .set("x-access-token", token);

      res.should.have.status(200);
      expect(res.body.id).to.eql(employee.id);
      expect(res.body.name).to.eql(employee.name);
      expect(res.body.email).to.eql(employee.email);
    });
  });

  describe("When token is invalid and id exists", () => {
    it("returns error", async () => {
      const id = 2;
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get(`/api/employees/${id}`)
        .set("x-access-token", "invalid_token");

      res.should.have.status(500);
      res.body.should.not.be.a("array");
      expect(res.error.text).to.include("Failed");
    });
  });

  describe("When token is not passed and id exists", () => {
    it("returns unauthorized", async () => {
      const id = 2;
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get(`/api/employees/${id}`);

      res.should.have.status(401);
      res.body.should.not.be.a("array");
      expect(res.error.text).to.include("No");
      expect(res.error.text).to.include("provided");
    });
  });

  describe("When token is valid and id doesn't exist", () => {
    it("returns empty", async () => {
      const id = 200;
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get(`/api/employees/${id}`)
        .set("x-access-token", token);

      res.should.have.status(200);
      expect(res.body).to.eql(null);
    });
  });
});

describe("/POST Employees", () => {
  const baseEmployeeInfo = {
    name: "G Example name",
    address: "Any street, 123",
    city: "Sao Paulo",
    state: "SP",
    country: "Brazil",
    occupation: "RH professional",
    birthDate: "1990-01-01",
    hireDate: "2020-01-01",
    phone: 5511999999999,
    email: "g_example@test.com",
    additionalInfo: "I like to drink water",
  };

  describe("When token is valid and body is correct", () => {
    it("creates the employee and return it", async () => {
      const employeeInfo = {
        ...baseEmployeeInfo,
        email: `1${baseEmployeeInfo.email}`,
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/employees/")
        .set("x-access-token", token)
        .send(employeeInfo);

      const employeeFromDatabase = await Employee.Model.findOne({
        where: { email: employeeInfo.email },
      });

      res.should.have.status(200);
      expect(res.body.id).to.eq(employeeFromDatabase.id);
      expect(res.body.name).to.eq(employeeInfo.name);
      expect(res.body.email).to.eq(employeeInfo.email);
    });
  });

  describe("When token is invalid and body is correct", () => {
    it("returns error", async () => {
      const employeeInfo = {
        ...baseEmployeeInfo,
        email: `2${baseEmployeeInfo.email}`,
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/employees/")
        .set("x-access-token", "invalid token")
        .send(employeeInfo);

      res.should.have.status(500);
      expect(res.error.text).to.include("Failed");
    });
  });

  describe("When token is not passed and body is correct", () => {
    it("returns unauthorized", async () => {
      const employeeInfo = {
        ...baseEmployeeInfo,
        email: `3${baseEmployeeInfo.email}`,
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/employees/")
        .send(employeeInfo);

      res.should.have.status(401);
      expect(res.error.text).to.include("No");
      expect(res.error.text).to.include("provided");
    });
  });

  describe("When token is valid and body is missing required param (name)", () => {
    it("returns error", async () => {
      const employeeInfo = {
        ...baseEmployeeInfo,
        email: `4${baseEmployeeInfo.email}`,
      };
      delete employeeInfo.name;

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/employees/")
        .set("x-access-token", token)
        .send(employeeInfo);

      const employeeFromDatabase = await Employee.Model.findOne({
        where: { email: employeeInfo.email },
      });

      res.should.have.status(400);
      expect(res.error.text).to.include("name");
      expect(employeeFromDatabase).to.eq(null);
    });
  });

  describe("When token is valid but the email is already being used", () => {
    it("returns error", async () => {
      const employeeInfo = {
        ...baseEmployeeInfo,
        email: `${employees[0].email}`,
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/employees/")
        .set("x-access-token", token)
        .send(employeeInfo);

      res.should.have.status(500);
      expect(res.error.text).to.include("email");
    });
  });

  describe("When token is valid but there is additional property in body", () => {
    it("returns error", async () => {
      const employeeInfo = {
        ...baseEmployeeInfo,
        email: `5${baseEmployeeInfo.email}`,
        otherPropertyHere: "malicious content",
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/employees/")
        .set("x-access-token", token)
        .send(employeeInfo);

      res.should.have.status(400);
      expect(res.error.text).to.include("additional");
    });
  });
});

describe("/PUT :id Employees", () => {
  let baseEmployeeInfo = {};
  before((done) => {
    baseEmployeeInfo = {
      name: employees[1].name,
      address: employees[1].address,
      city: employees[1].city,
      state: employees[1].state,
      country: employees[1].country,
      occupation: employees[1].occupation,
      birthDate: employees[1].birthDate,
      hireDate: employees[1].hireDate,
      phone: employees[1].phone,
      email: employees[1].email,
      additionalInfo: employees[1].additionalInfo,
    };
    done();
  });

  describe("When token is valid and body is correct", () => {
    it("updates the employee and return it", async () => {
      const employeeInfo = {
        ...baseEmployeeInfo,
        city: "Salvador",
        phone: 5511966666666,
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/employees/${employees[1].id}`)
        .set("x-access-token", token)
        .send(employeeInfo);

      const employeeFromDatabase = await Employee.Model.findOne({
        where: { email: employeeInfo.email },
      });

      res.should.have.status(200);
      expect(res.body.id).to.eq(employeeFromDatabase.id);
      expect(res.body.city).to.eq(employeeInfo.city);
      expect(res.body.phone).to.eq(employeeInfo.phone);
      expect(res.body.email).to.eq(employeeInfo.email);
    });
  });

  describe("When token is invalid and body is correct", () => {
    it("returns error", async () => {
      const employeeInfo = {
        ...baseEmployeeInfo,
        city: "Salvador2",
        phone: 5511966666662,
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/employees/${employees[1].id}`)
        .set("x-access-token", "invalid_token")
        .send(employeeInfo);

      const employeeFromDatabase = await Employee.Model.findOne({
        where: { email: employeeInfo.email },
      });

      res.should.have.status(500);
      expect(res.error.text).to.include("Failed");
      expect(employeeFromDatabase.city).to.not.eq(employeeInfo.city);
      expect(employeeFromDatabase.phone).to.not.eq(employeeInfo.phone);
    });
  });

  describe("When token is not passed and body is correct", () => {
    it("returns unauthorized", async () => {
      const employeeInfo = {
        ...baseEmployeeInfo,
        city: "Salvador3",
        phone: 5511966666663,
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/employees/${employees[1].id}`)
        .send(employeeInfo);

      const employeeFromDatabase = await Employee.Model.findOne({
        where: { email: employeeInfo.email },
      });

      res.should.have.status(401);
      expect(res.error.text).to.include("No");
      expect(res.error.text).to.include("provided");
      expect(employeeFromDatabase.city).to.not.eq(employeeInfo.city);
      expect(employeeFromDatabase.phone).to.not.eq(employeeInfo.phone);
    });
  });

  describe("When token is valid and body is missing required param (name)", () => {
    it("returns error", async () => {
      const employeeInfo = {
        ...baseEmployeeInfo,
        city: "Salvador4",
        phone: 5511966666664,
      };
      delete employeeInfo.name;

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/employees/${employees[1].id}`)
        .set("x-access-token", token)
        .send(employeeInfo);

      const employeeFromDatabase = await Employee.Model.findOne({
        where: { email: employeeInfo.email },
      });

      res.should.have.status(400);
      expect(res.error.text).to.include("name");
      expect(employeeFromDatabase.city).to.not.eq(employeeInfo.city);
      expect(employeeFromDatabase.phone).to.not.eq(employeeInfo.phone);
    });
  });

  describe("When token is valid but the email is already being used", () => {
    it("returns error", async () => {
      const employeeInfo = {
        ...baseEmployeeInfo,
        city: "Salvador5",
        phone: 5511966666665,
        email: employees[2].email,
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/employees/${employees[1].id}`)
        .set("x-access-token", token)
        .send(employeeInfo);

      const employeeFromDatabase = await Employee.Model.findOne({
        where: { email: employees[1].email },
      });

      res.should.have.status(500);
      expect(res.error.text).to.include("email");
      expect(employeeFromDatabase.city).to.not.eq(employeeInfo.city);
      expect(employeeFromDatabase.phone).to.not.eq(employeeInfo.phone);
    });
  });
});

describe("/DELETE :id Employees", () => {
  describe("When token is valid and id exists", () => {
    it("deletes the employee", async () => {
      const { id } = employees[0];

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .delete(`/api/employees/${id}`)
        .set("x-access-token", token);

      const employeeFromDatabase = await Employee.Model.findByPk(id);

      res.should.have.status(200);
      expect(res.body.message).to.include("Destroyed");
      expect(employeeFromDatabase).to.eq(null);
    });
  });

  describe("When token is invalid and id exists", () => {
    it("returns error", async () => {
      const { id } = employees[1];

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .delete(`/api/employees/${id}`)
        .set("x-access-token", "invalid_token");

      const employeeFromDatabase = await Employee.Model.findByPk(id);

      res.should.have.status(500);
      expect(res.error.text).to.include("Failed");
      expect(employeeFromDatabase).to.not.eq(null);
      expect(employeeFromDatabase.id).to.eq(id);
    });
  });

  describe("When token is not passed and id exists", () => {
    it("returns unauthorized", async () => {
      const { id } = employees[2];

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .delete(`/api/employees/${id}`);

      const employeeFromDatabase = await Employee.Model.findByPk(id);

      res.should.have.status(401);
      expect(res.error.text).to.include("No");
      expect(res.error.text).to.include("provided");
      expect(employeeFromDatabase).to.not.eq(null);
      expect(employeeFromDatabase.id).to.eq(id);
    });
  });

  describe("When token is valid and id doesn't exist", () => {
    it("returns error", async () => {
      const { id } = 200;

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .delete(`/api/employees/${id}`)
        .set("x-access-token", token);

      const employeeFromDatabase = await Employee.Model.findByPk(id);

      res.should.have.status(500);
      expect(res.error.text).to.include("id");
      expect(employeeFromDatabase).to.eq(null);
    });
  });
});

after(async () => {
  await Employee.Model.destroy({
    truncate: true,
  });
});
