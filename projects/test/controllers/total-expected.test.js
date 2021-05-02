/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const chaiHttp = require("chai-http");

const Project = require("../../models/projects");
const { getTokenForTests } = require("../../utils/get-token-for-tests");
require("../../index");

const { expect } = chai;
const should = chai.should();

chai.use(chaiHttp);

let projects = [];
let token = "";

const setTokenAndProjects = async () => {
  token = await getTokenForTests();

  const projectsArray = [];
  projectsArray.push(
    await Project.Model.create({
      name: "Project 1",
      startDate: "2021-01-01",
      incomeDate: "2021-06-01",
      costDate: "2021-01-01",
      expectedIncome: 1000.0,
      expectedCost: 100.0,
    })
  );
  projectsArray.push(
    await Project.Model.create({
      name: "Project 1",
      startDate: "2022-01-01",
      incomeDate: "2022-07-01",
      costDate: "2022-02-01",
      expectedIncome: 2000.0,
      expectedCost: 200.0,
    })
  );
  projectsArray.push(
    await Project.Model.create({
      name: "Project 1",
      startDate: "2021-01-01",
      incomeDate: "2021-07-01",
      costDate: "2021-02-01",
      expectedIncome: 3000.0,
      expectedCost: 300.0,
    })
  );
  projectsArray.push(
    await Project.Model.create({
      name: "Project 1",
      startDate: "2021-03-01",
      incomeDate: "2021-08-01",
      costDate: "2021-03-01",
      expectedIncome: 4000.0,
      expectedCost: 400.0,
    })
  );
  projectsArray.push(
    await Project.Model.create({
      name: "Project 1",
      startDate: "2021-04-01",
      incomeDate: "2021-09-01",
      costDate: "2021-04-01",
      expectedIncome: 5000.0,
      expectedCost: 500.0,
    })
  );
  projectsArray.push(
    await Project.Model.create({
      name: "Project 1",
      startDate: "2022-01-01",
      incomeDate: "2022-06-01",
      costDate: "2022-01-01",
      expectedIncome: 6000.0,
      expectedCost: 600.0,
    })
  );
  projects = projectsArray;
};

const cleanTable = async () => {
  await Project.Model.destroy({ where: {} });
};

describe("/GET Income", () => {
  before(async () => {
    await cleanTable();
    await setTokenAndProjects();
  });

  describe("When token is valid", () => {
    it("returns the expectedIncome from all projects", async () => {
      const total = projects
        .map((proj) => proj.expectedIncome)
        .reduce((sum, item) => sum + item);
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/total-expected/income")
        .set("x-access-token", token);

      res.should.have.status(200);
      expect(res.body.totalExpectedIncome).to.eq(total);
    });
  });

  describe("When token is invalid", () => {
    it("returns error", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/total-expected/income")
        .set("x-access-token", "invalid token");

      res.should.have.status(500);
      res.body.should.not.be.a("array");
      expect(res.error.text).to.include("Failed");
    });
  });

  describe("When token is valid and filtered by incomeDate range", () => {
    it("returns all projects in range", async () => {
      const minIncomeDate = new Date("2021-03-01");
      const maxIncomeDate = new Date("2022-01-01");
      const total = projects
        .filter(
          (proj) =>
            new Date(proj.incomeDate) >= minIncomeDate &&
            new Date(proj.incomeDate) <= maxIncomeDate
        )
        .map((proj) => proj.expectedIncome)
        .reduce((sum, item) => sum + item);
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/total-expected/income")
        .query({ minIncomeDate, maxIncomeDate })
        .set("x-access-token", token);

      res.should.have.status(200);
      expect(res.body.totalExpectedIncome).to.eq(total);
    });
  });

  after(async () => {
    await cleanTable();
  });
});

describe("/GET Cost", () => {
  before(async () => {
    await cleanTable();
    await setTokenAndProjects();
  });

  describe("When token is valid", () => {
    it("returns the expectedCost from all projects", async () => {
      const total = projects
        .map((proj) => proj.expectedCost)
        .reduce((sum, item) => sum + item);
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/total-expected/cost")
        .set("x-access-token", token);

      res.should.have.status(200);
      expect(res.body.totalExpectedCost).to.eq(total);
    });
  });

  describe("When token is invalid", () => {
    it("returns error", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/total-expected/cost")
        .set("x-access-token", "invalid token");

      res.should.have.status(500);
      res.body.should.not.be.a("array");
      expect(res.error.text).to.include("Failed");
    });
  });

  describe("When token is valid and filtered by costDate range", () => {
    it("returns all projects in range", async () => {
      const minCostDate = new Date("2021-03-01");
      const maxCostDate = new Date("2022-01-02");
      const total = projects
        .filter(
          (proj) =>
            new Date(proj.costDate) >= minCostDate &&
            new Date(proj.costDate) <= maxCostDate
        )
        .map((proj) => proj.expectedCost)
        .reduce((sum, item) => sum + item);
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/total-expected/cost")
        .query({ minCostDate, maxCostDate })
        .set("x-access-token", token);

      res.should.have.status(200);
      expect(res.body.totalExpectedCost).to.eq(total);
    });
  });

  after(async () => {
    await cleanTable();
  });
});
