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
      endDate: "2021-06-01",
      incomeDate: "2021-06-01",
      costDate: "2021-01-01",
      expectedIncome: 2000.0,
      expectedCost: 200.0,
      description: "Our first project",
      target: "All the people",
      status: "PENDING",
      responsibleArea: "First area",
      involvedTeams: "Any team",
    })
  );
  projectsArray.push(
    await Project.Model.create({
      name: "Project 2",
      startDate: "2021-02-01",
      endDate: "2021-06-01",
      incomeDate: "2021-06-01",
      costDate: "2021-02-01",
      expectedIncome: 5000.0,
      expectedCost: 100.0,
      description: "Our second project",
      status: "PENDING",
      responsibleArea: "First area",
      involvedTeams: "Any team",
    })
  );
  projectsArray.push(
    await Project.Model.create({
      name: "Project 3",
      startDate: "2021-03-01",
      endDate: "2021-06-01",
      incomeDate: "2021-06-01",
      costDate: "2021-03-01",
      expectedIncome: 10000.0,
      expectedCost: 500.0,
      description: "Our third project",
      status: "PENDING",
    })
  );
  projectsArray.push(
    await Project.Model.create({
      name: "Project 4",
      startDate: "2021-04-01",
      expectedIncome: 20000.0,
      expectedCost: 10.0,
      description: "Our fourth project",
      status: "PENDING",
    })
  );
  projectsArray.push(
    await Project.Model.create({
      name: "Project 5",
      startDate: "2021-05-01",
      expectedCost: 0.0,
      description: "Our fifth project",
      status: "CANCELED",
    })
  );
  projectsArray.push(
    await Project.Model.create({
      name: "Project 6",
      startDate: "2021-06-01",
      endDate: "2021-06-01",
      expectedIncome: 2000.0,
      description: "Our sixth project",
      status: "FINISHED",
    })
  );
  projects = projectsArray;
};

const cleanTable = async () => {
  await Project.Model.destroy({ where: {} });
};

describe("/GET Projects", () => {
  before(async () => {
    await cleanTable();
    await setTokenAndProjects();
  });

  describe("When token is valid", () => {
    it("returns all projects ordered by startDate asc", async () => {
      const sortedProjectsDates = projects.map((proj) => proj.startDate).sort();
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/projects")
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.should.be.a("array");
      expect(res.body.length).to.eq(projects.length);
      expect(res.body.map((proj) => proj.startDate)).to.eql(
        sortedProjectsDates
      );
      expect(res.body[0].startDate).to.eql(sortedProjectsDates[0]);
    });
  });

  describe("When token is invalid", () => {
    it("returns error", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/projects")
        .set("x-access-token", "invalid token");

      res.should.have.status(500);
      res.body.should.not.be.a("array");
      expect(res.error.text).to.include("Failed");
    });
  });

  describe("When token is valid and filtered by minIncome", () => {
    it("returns only projects with income higher than requested", async () => {
      const minIncome = 6000;
      const filteredProjects = projects.filter(
        (proj) => proj.expectedIncome >= minIncome
      );
      const sortedFilteredProjectsDates = filteredProjects
        .map((proj) => proj.startDate)
        .sort();

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/projects")
        .query({ minIncome })
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.should.be.a("array");
      expect(res.body.length).to.eq(sortedFilteredProjectsDates.length);
      expect(res.body.map((proj) => proj.startDate)).to.eql(
        sortedFilteredProjectsDates
      );
      expect(res.body[0].startDate).to.eql(sortedFilteredProjectsDates[0]);
    });
  });

  describe("When token is valid and filtered by date range", () => {
    it("returns all projects in range", async () => {
      const minStartDate = new Date("2021-03-01");
      const maxStartDate = new Date("2022-03-01");
      const filteredProjects = projects.filter(
        (proj) =>
          new Date(proj.startDate) >= minStartDate &&
          new Date(proj.startDate) <= maxStartDate
      );
      const sortedFilteredProjectsDates = filteredProjects
        .map((proj) => proj.startDate)
        .sort();

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/projects")
        .query({ minStartDate, maxStartDate })
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.should.be.a("array");
      expect(res.body.length).to.eq(sortedFilteredProjectsDates.length);
      expect(res.body.map((proj) => proj.startDate)).to.eql(
        sortedFilteredProjectsDates
      );
      expect(res.body[0].startDate).to.eql(sortedFilteredProjectsDates[0]);
    });
  });

  after(async () => {
    await cleanTable();
  });
});

describe("/GET :id Projects", () => {
  before(async () => {
    await cleanTable();
    await setTokenAndProjects();
  });

  describe("When token is valid", () => {
    it("returns the requested project", async () => {
      const { id } = projects[1];
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get(`/api/projects/${id}`)
        .set("x-access-token", token);

      res.should.have.status(200);
      expect(res.body.id).to.eq(projects[1].id);
      expect(res.body.name).to.eq(projects[1].name);
      expect(res.body.startDate).to.eq(projects[1].startDate);
    });
  });

  describe("When token is invalid", () => {
    it("returns error", async () => {
      const { id } = projects[1];
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get(`/api/projects/${id}`)
        .set("x-access-token", "invalid token");

      res.should.have.status(500);
      res.body.should.not.be.a("array");
      expect(res.error.text).to.include("Failed");
    });
  });

  describe("When token is valid but id is invalid", () => {
    it("returns error", async () => {
      const { id } = projects[1] + 5000;
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get(`/api/projects/${id}`)
        .set("x-access-token", token);

      res.should.have.status(500);
      res.body.should.not.be.a("array");
      expect(res.error).to.not.eq(null);
    });
  });

  after(async () => {
    await cleanTable();
  });
});

describe("/POST Projects", () => {
  let baseProject = {};
  beforeEach(async () => {
    await cleanTable();
    await setTokenAndProjects();
    baseProject = {
      name: "Base Project",
      startDate: "2021-01-12",
      endDate: "2021-06-12",
      incomeDate: "2021-06-12",
      costDate: "2021-01-12",
      expectedIncome: 2000.0,
      expectedCost: 200.0,
      description: "Our base project",
      target: "All the basic people",
      status: "PENDING",
      responsibleArea: "First area",
      involvedTeams: "Any team",
    };
  });

  describe("When token is valid and body correct", () => {
    it("returns the project created", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/projects/")
        .set("x-access-token", token)
        .send(baseProject);
      const projectFromDatabase = await Project.Model.findOne({
        where: { name: baseProject.name },
      });

      res.should.have.status(200);
      expect(res.body.name).to.eq(baseProject.name);
      expect(res.body.startDate).to.eq(baseProject.startDate);
      expect(res.body.description).to.eq(baseProject.description);
      expect(projectFromDatabase.name).to.eq(baseProject.name);
      expect(projectFromDatabase.startDate).to.eq(baseProject.startDate);
      expect(projectFromDatabase.description).to.eq(baseProject.description);
    });
  });

  describe("When token is invalid and body correct", () => {
    it("returns error", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/projects/")
        .set("x-access-token", "invalid token")
        .send(baseProject);

      res.should.have.status(500);
      expect(res.error.text).to.include("Failed");
    });
  });

  describe("When token is valid but body is missing required param", () => {
    it("returns error", async () => {
      delete baseProject.name;

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/projects/")
        .set("x-access-token", token)
        .send(baseProject);

      res.should.have.status(400);
      expect(res.error.text).to.include("name");
      expect(res.error).to.not.eq(null);
    });
  });

  describe("When token is valid but body has param in wrong type", () => {
    it("returns error", async () => {
      baseProject.expectedCost = "cost expected";

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/projects/")
        .set("x-access-token", token)
        .send(baseProject);

      res.should.have.status(400);
      expect(res.error.text).to.include("expectedCost");
      expect(res.error).to.not.eq(null);
    });
  });
});

describe("/PUT :id Projects", () => {
  let baseProject = {};
  beforeEach(async () => {
    await cleanTable();
    await setTokenAndProjects();

    baseProject = {
      name: "Updated Project",
      startDate: "2022-01-01",
      endDate: "2022-06-01",
      incomeDate: "2022-06-01",
      costDate: "2022-01-01",
      expectedIncome: 2000.0,
      expectedCost: 200.0,
      description: "Our updated project",
      target: "All the people updated",
      status: "CANCELED",
      responsibleArea: "First area",
      involvedTeams: "Any team",
    };
  });

  describe("When token is valid and body correct", () => {
    it("returns the project updated", async () => {
      const { id } = projects[1];

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/projects/${id}`)
        .set("x-access-token", token)
        .send(baseProject);

      const projectFromDatabase = await Project.Model.findOne({
        where: { id },
      });

      res.should.have.status(200);
      expect(res.body.name).to.eq(baseProject.name);
      expect(res.body.startDate).to.eq(baseProject.startDate);
      expect(res.body.description).to.eq(baseProject.description);
      expect(projectFromDatabase.name).to.eq(baseProject.name);
      expect(projectFromDatabase.startDate).to.eq(baseProject.startDate);
      expect(projectFromDatabase.description).to.eq(baseProject.description);
    });
  });

  describe("When token is invalid and body correct", () => {
    it("returns error", async () => {
      const { id } = projects[1];
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/projects/${id}`)
        .set("x-access-token", "invalid token")
        .send(baseProject);

      res.should.have.status(500);
      expect(res.error).to.not.eq(null);
      expect(res.error.text).to.include("Failed");
    });
  });

  describe("When token is valid but body is missing required param", () => {
    it("returns error", async () => {
      const { id } = projects[1];
      delete baseProject.name;

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/projects/${id}`)
        .set("x-access-token", token)
        .send(baseProject);

      res.should.have.status(400);
      expect(res.error.text).to.include("name");
      expect(res.error).to.not.eq(null);
    });
  });

  describe("When token is valid but body has param in wrong type", () => {
    it("returns error", async () => {
      const { id } = projects[1];
      baseProject.name = 123123;

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/projects/${id}`)
        .set("x-access-token", token)
        .send(baseProject);

      res.should.have.status(400);
      expect(res.error.text).to.include("name");
      expect(res.error).to.not.eq(null);
    });
  });
});

describe("/DELETE :id Projects", () => {
  beforeEach(async () => {
    await cleanTable();
    await setTokenAndProjects();
  });

  describe("When token is valid", () => {
    it("returns success", async () => {
      const { id } = projects[1];

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .delete(`/api/projects/${id}`)
        .set("x-access-token", token);

      const projectFromDatabase = await Project.Model.findOne({
        where: { id },
      });

      res.should.have.status(200);
      expect(res.body.message).to.eq("Destroyed!");
      expect(projectFromDatabase).to.eq(null);
    });
  });

  describe("When token is invalid", () => {
    it("returns error", async () => {
      const { id } = projects[1];

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .delete(`/api/projects/${id}`)
        .set("x-access-token", "invalid token");
      const projectFromDatabase = await Project.Model.findOne({
        where: { id },
      });

      res.should.have.status(500);
      expect(res.error.text).to.include("Failed");
      expect(res.error).to.not.eq(null);
      expect(projectFromDatabase).to.not.eq(null);
    });
  });

  describe("When token is valid but id doesnt exist", () => {
    it("returns error", async () => {
      const { id } = projects[1] + 500;

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .delete(`/api/projects/${id}`)
        .set("x-access-token", token);

      res.should.have.status(500);
      expect(res.error).to.not.eq(null);
    });
  });
});
