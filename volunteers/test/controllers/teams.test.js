/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const chaiHttp = require("chai-http");
const teamVolunteers = require("../../models/team-volunteers");
const Team = require("../../models/teams");
const volunteers = require("../../models/volunteers");
const { getTokenForTests } = require("../../utils/get-token-for-tests");
require("../../index");

const { expect } = chai;
const should = chai.should();

chai.use(chaiHttp);

let teams = [];
let token = "";

const setTokenAndTeams = async () => {
  await teamVolunteers.Model.destroy({ where: {} });
  await volunteers.Model.destroy({ where: {} });
  await Team.Model.destroy({ where: {} });

  const teamsArray = [];
  token = await getTokenForTests();

  teamsArray.push(
    await Team.Model.create(
      {
        name: "Team 1",
        description: "We like to drink water",
        volunteers: [
          {
            name: "Example for team",
            address: "Any street, 123",
            city: "Sao Paulo",
            state: "SP",
            country: "Brazil",
            birthDate: "1990-01-01",
            phone: 5511999999999,
            email: "example_for_team@test.com",
            additionalInfo: "I like to drink water",
          },
          {
            name: "Another example for team",
            address: "Any street, 123",
            city: "Sao Paulo",
            state: "SP",
            country: "Brazil",
            birthDate: "1990-01-01",
            phone: 5511999999999,
            email: "another_example_for_team@test.com",
            additionalInfo: "I like to drink water",
          },
        ],
      },
      {
        include: [volunteers.Model],
      }
    ).then((res) => res)
  );
  teamsArray.push(
    await Team.Model.create({
      name: "Team 2",
      description: "We like to eat water",
    }).then((res) => res)
  );
  teamsArray.push(
    await Team.Model.create({
      name: "Team 3",
      description: "We like to cook water",
    }).then((res) => res)
  );
  teamsArray.push(
    await Team.Model.create({
      name: "Team 4",
      description: "We like to fry water",
    }).then((res) => res)
  );
  teamsArray.push(
    await Team.Model.create({
      name: "Team 5",
      description: "We like to lick water",
    }).then((res) => res)
  );
  teamsArray.push(
    await Team.Model.create({
      name: "Team 6",
      description: "We like to see water",
    }).then((res) => res)
  );
  teams = teamsArray;
};

const cleanTable = async () => {
  await teamVolunteers.Model.destroy({ where: {} });
  await volunteers.Model.destroy({ where: {} });
  await Team.Model.destroy({ where: {} });
};

describe("/GET Teams", () => {
  before(async () => {
    await setTokenAndTeams();
  });

  describe("When token is valid", () => {
    it("returns all teams ordered by name", async () => {
      const sortedTeamsNames = teams.map((team) => team.name).sort();
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/teams/")
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.should.be.a("array");
      expect(res.body.length).to.eq(teams.length);
      expect(res.body.map((team) => team.name)).to.eql(sortedTeamsNames);
      expect(res.body[0].name).to.eql(sortedTeamsNames[0]);
    });
  });

  describe("When token is invalid", () => {
    it("returns error", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/teams/")
        .set("x-access-token", "invalid token");

      res.should.have.status(500);
      res.body.should.not.be.a("array");
      expect(res.error.text).to.include("Failed");
    });
  });

  describe("When token is not passed", () => {
    it("returns unauthorized", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/teams/");

      res.should.have.status(401);
      res.body.should.not.be.a("array");
      expect(res.error.text).to.include("No");
      expect(res.error.text).to.include("provided");
    });
  });

  after(async () => {
    await cleanTable();
  });
});

describe("/GET :id Teams", () => {
  before(async () => {
    await setTokenAndTeams();
  });

  describe("When token is valid and id exists", () => {
    it("returns the team", async () => {
      const { id } = teams[1];
      const team = teams.find((ar) => ar.id === id);
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get(`/api/teams/${id}`)
        .set("x-access-token", token);

      res.should.have.status(200);
      expect(res.body.id).to.eql(team.id);
      expect(res.body.name).to.eql(team.name);
      expect(res.body.description).to.eql(team.description);
    });
  });

  describe("When token is invalid and id exists", () => {
    it("returns error", async () => {
      const { id } = teams[1];
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get(`/api/teams/${id}`)
        .set("x-access-token", "invalid_token");

      res.should.have.status(500);
      res.body.should.not.be.a("array");
      expect(res.error.text).to.include("Failed");
    });
  });

  describe("When token is not passed and id exists", () => {
    it("returns unauthorized", async () => {
      const { id } = teams[1];
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get(`/api/teams/${id}`);

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
        .get(`/api/teams/${id}`)
        .set("x-access-token", token);

      res.should.have.status(200);
      expect(res.body).to.eql(null);
    });
  });

  describe("When token is valid filtered by volunteer", () => {
    it("returns only first team", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/teams/")
        .query({ volunteerId: teams[0].volunteers[0].id })
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.should.be.a("array");
      expect(res.body.length).to.eq(1);
      expect(res.body[0].volunteers.map((emp) => emp.id)).to.have.same.members(
        teams[0].volunteers.map((emp) => emp.id)
      );
    });
  });

  after(async () => {
    await cleanTable();
  });
});

describe("/POST Teams", () => {
  before(async () => {
    await setTokenAndTeams();
  });

  const baseTeamInfo = {
    name: "Team 7",
    description: "We like to dance with water",
    volunteerIds: [],
  };

  describe("When token is valid and body is correct", () => {
    it("creates the team and return it", async () => {
      const teamInfo = {
        ...baseTeamInfo,
        name: `1${baseTeamInfo.name}`,
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/teams/")
        .set("x-access-token", token)
        .send(teamInfo);

      const teamFromDatabase = await Team.Model.findOne({
        where: { name: teamInfo.name },
      });

      res.should.have.status(200);
      expect(res.body.id).to.eq(teamFromDatabase.id);
      expect(res.body.name).to.eq(teamInfo.name);
      expect(res.body.description).to.eq(teamInfo.description);
    });
  });

  describe("When token is invalid and body is correct", () => {
    it("returns error", async () => {
      const teamInfo = {
        ...baseTeamInfo,
        name: `2${baseTeamInfo.name}`,
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/teams/")
        .set("x-access-token", "invalid token")
        .send(teamInfo);

      res.should.have.status(500);
      expect(res.error.text).to.include("Failed");
    });
  });

  describe("When token is not passed and body is correct", () => {
    it("returns unauthorized", async () => {
      const teamInfo = {
        ...baseTeamInfo,
        name: `3${baseTeamInfo.name}`,
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/teams/")
        .send(teamInfo);

      res.should.have.status(401);
      expect(res.error.text).to.include("No");
      expect(res.error.text).to.include("provided");
    });
  });

  describe("When token is valid and body is missing required param (name)", () => {
    it("returns error", async () => {
      const teamInfo = {
        ...baseTeamInfo,
        name: `4${baseTeamInfo.name}`,
      };
      delete teamInfo.name;

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/teams/")
        .set("x-access-token", token)
        .send(teamInfo);

      res.should.have.status(400);
      expect(res.error.text).to.include("name");
    });
  });

  describe("When token is valid but the name is already being used", () => {
    it("returns error", async () => {
      const teamInfo = {
        ...baseTeamInfo,
        name: `${teams[0].name}`,
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/teams/")
        .set("x-access-token", token)
        .send(teamInfo);

      res.should.have.status(500);
      expect(res.error.text).to.include("name");
    });
  });

  after(async () => {
    await cleanTable();
  });
});

describe("/PUT :id Teams", () => {
  before(async () => {
    await setTokenAndTeams();
  });

  let baseTeamInfo = {};
  before((done) => {
    baseTeamInfo = {
      name: teams[1].name,
      description: teams[1].description,
      volunteerIds: [],
    };
    done();
  });

  describe("When token is valid and body is correct", () => {
    it("updates the team and return it", async () => {
      const teamInfo = {
        ...baseTeamInfo,
        description: "We like to drink juice",
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/teams/${teams[1].id}`)
        .set("x-access-token", token)
        .send(teamInfo);

      const teamFromDatabase = await Team.Model.findOne({
        where: { name: teamInfo.name },
      });

      res.should.have.status(200);
      expect(res.body.id).to.eq(teamFromDatabase.id);
      expect(res.body.description).to.eq(teamInfo.description);
      expect(res.body.name).to.eq(teamInfo.name);
    });
  });

  describe("When token is invalid and body is correct", () => {
    it("returns error", async () => {
      const teamInfo = {
        ...baseTeamInfo,
        description: "We like to drink juice2",
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/teams/${teams[1].id}`)
        .set("x-access-token", "invalid_token")
        .send(teamInfo);

      const teamFromDatabase = await Team.Model.findOne({
        where: { name: teamInfo.name },
      });

      res.should.have.status(500);
      expect(res.error.text).to.include("Failed");
      expect(teamFromDatabase.description).to.not.eq(teamInfo.description);
    });
  });

  describe("When token is not passed and body is correct", () => {
    it("returns unauthorized", async () => {
      const teamInfo = {
        ...baseTeamInfo,
        description: "We like to drink juice3",
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/teams/${teams[1].id}`)
        .send(teamInfo);

      const teamFromDatabase = await Team.Model.findOne({
        where: { name: teamInfo.name },
      });

      res.should.have.status(401);
      expect(res.error.text).to.include("No");
      expect(res.error.text).to.include("provided");
      expect(teamFromDatabase.description).to.not.eq(teamInfo.description);
    });
  });

  describe("When token is valid and body is missing required param (name)", () => {
    it("returns error", async () => {
      const teamInfo = {
        ...baseTeamInfo,
        description: "We like to drink juice4",
      };
      delete teamInfo.name;

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/teams/${teams[1].id}`)
        .set("x-access-token", token)
        .send(teamInfo);

      const teamFromDatabase = await Team.Model.findOne({
        where: { id: teams[1].id },
      });

      res.should.have.status(400);
      expect(res.error.text).to.include("name");
      expect(teamFromDatabase.description).to.not.eq(teamInfo.description);
    });
  });

  describe("When token is valid but the name is already being used", () => {
    it("returns error", async () => {
      const teamInfo = {
        name: teams[0].name,
        description: "We like to drink juice5",
        volunteerIds: [],
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/teams/${teams[1].id}`)
        .set("x-access-token", token)
        .send(teamInfo);

      const teamFromDatabase = await Team.Model.findOne({
        where: { name: teams[1].name },
      });

      res.should.have.status(500);
      expect(res.error.text).to.include("name");
      expect(teamFromDatabase.description).to.not.eq(teamInfo.description);
    });
  });

  after(async () => {
    await cleanTable();
  });
});

describe("/DELETE :id Teams", () => {
  before(async () => {
    await setTokenAndTeams();
  });

  describe("When token is valid and id exists", () => {
    it("deletes the team", async () => {
      const { id } = teams[0];

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .delete(`/api/teams/${id}`)
        .set("x-access-token", token);

      const teamFromDatabase = await Team.Model.findByPk(id);

      res.should.have.status(200);
      expect(res.body.message).to.include("Destroyed");
      expect(teamFromDatabase).to.eq(null);
    });
  });

  describe("When token is invalid and id exists", () => {
    it("returns error", async () => {
      const { id } = teams[1];

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .delete(`/api/teams/${id}`)
        .set("x-access-token", "invalid_token");

      const teamFromDatabase = await Team.Model.findByPk(id);

      res.should.have.status(500);
      expect(res.error.text).to.include("Failed");
      expect(teamFromDatabase).to.not.eq(null);
      expect(teamFromDatabase.id).to.eq(id);
    });
  });

  describe("When token is not passed and id exists", () => {
    it("returns unauthorized", async () => {
      const { id } = teams[2];

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .delete(`/api/teams/${id}`);

      const teamFromDatabase = await Team.Model.findByPk(id);

      res.should.have.status(401);
      expect(res.error.text).to.include("No");
      expect(res.error.text).to.include("provided");
      expect(teamFromDatabase).to.not.eq(null);
      expect(teamFromDatabase.id).to.eq(id);
    });
  });

  describe("When token is valid and id doesn't exist", () => {
    it("returns error", async () => {
      const id = teams[2].id + 500;

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .delete(`/api/teams/${id}`)
        .set("x-access-token", token);

      const teamFromDatabase = await Team.Model.findByPk(id);

      res.should.have.status(500);
      expect(res.error.text).to.include("id");
      expect(teamFromDatabase).to.eq(null);
    });
  });

  after(async () => {
    await cleanTable();
  });
});
