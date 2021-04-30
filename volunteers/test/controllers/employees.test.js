/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const chaiHttp = require("chai-http");
const Volunteer = require("../../models/volunteers");
const teams = require("../../models/teams");
const teamVolunteers = require("../../models/team-volunteers");
const areaVolunteers = require("../../models/area-volunteers");
const { getTokenForTests } = require("../../utils/get-token-for-tests");
const areas = require("../../models/areas");
require("../../index");

const { expect } = chai;
const should = chai.should();

chai.use(chaiHttp);

let volunteers = [];
let token = "";

describe("/GET Volunteers", () => {
  before(async () => {
    await areaVolunteers.Model.destroy({ where: {} });
    await teamVolunteers.Model.destroy({ where: {} });
    await teams.Model.destroy({ where: {} });
    await areas.Model.destroy({ where: {} });
    await Volunteer.Model.destroy({ where: {} });

    token = await getTokenForTests();

    const volunteersCreated = [];
    volunteersCreated.push(
      await Volunteer.Model.create(
        {
          name: "Example name With teams and areas",
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
          teams: [
            {
              name: "Team 1",
              description: "Team 1 very cool",
            },
            {
              name: "Team 2",
              description: "Team 2 not so cool",
            },
          ],
        },
        {
          include: [areas.Model, teams.Model],
        }
      ).then((res) => res)
    );
    volunteersCreated.push(
      await Volunteer.Model.create({
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
    volunteersCreated.push(
      await Volunteer.Model.create({
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
    volunteersCreated.push(
      await Volunteer.Model.create({
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
    volunteersCreated.push(
      await Volunteer.Model.create({
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
    volunteersCreated.push(
      await Volunteer.Model.create({
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
    volunteers = volunteersCreated;
  });

  describe("When token is valid and there are no filters", () => {
    it("returns all volunteers ordered by name", async () => {
      const sortedVolunteersNames = volunteers
        .map((volunteer) => volunteer.name)
        .sort();
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/volunteers/")
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.should.be.a("array");
      expect(res.body.length).to.eq(volunteers.length);
      expect(res.body.map((volunteer) => volunteer.name)).to.eql(
        sortedVolunteersNames
      );
      expect(res.body[0].name).to.eql(sortedVolunteersNames[0]);
    });
  });

  describe("When token is invalid and there are no filters", () => {
    it("returns error", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/volunteers/")
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
        .get("/api/volunteers/");

      res.should.have.status(401);
      res.body.should.not.be.a("array");
      expect(res.error.text).to.include("No");
      expect(res.error.text).to.include("provided");
    });
  });

  describe("When token is valid filtered by occupation", () => {
    it("returns some volunteers", async () => {
      const occupation = "Software Engineer";
      const volunteersWithOccupation = volunteers.filter(
        (volunteer) => volunteer.occupation === occupation
      );
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/volunteers/")
        .query({ occupation })
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.should.be.a("array");
      expect(res.body.length).to.eq(volunteersWithOccupation.length);
      expect(res.body.map((volunteer) => volunteer.id)).to.have.same.members(
        volunteersWithOccupation.map((volunteer) => volunteer.id)
      );
    });
  });

  describe("When token is valid filtered by city", () => {
    it("returns some volunteers", async () => {
      const city = "Rio de janeiro";
      const volunteersFromCity = volunteers.filter(
        (volunteer) => volunteer.city === city
      );
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/volunteers/")
        .query({ city })
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.should.be.a("array");
      expect(res.body.length).to.eq(volunteersFromCity.length);
      expect(res.body.map((volunteer) => volunteer.id)).to.have.same.members(
        volunteersFromCity.map((volunteer) => volunteer.id)
      );
    });
  });

  describe("When token is valid filtered by state", () => {
    it("returns some volunteers", async () => {
      const state = "SP";
      const volunteersFromState = volunteers.filter(
        (volunteer) => volunteer.state === state
      );
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/volunteers/")
        .query({ state })
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.should.be.a("array");
      expect(res.body.length).to.eq(volunteersFromState.length);
      expect(res.body.map((volunteer) => volunteer.id)).to.have.same.members(
        volunteersFromState.map((volunteer) => volunteer.id)
      );
    });
  });

  describe("When token is valid filtered by area", () => {
    it("returns only first volunteer", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/volunteers/")
        .query({ areaId: volunteers[0].areas[0].id })
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.should.be.a("array");
      expect(res.body.length).to.eq(1);
      expect(res.body[0].areas.map((area) => area.id)).to.have.same.members(
        volunteers[0].areas.map((area) => area.id)
      );
    });
  });
});

describe("/GET :id Volunteers", () => {
  describe("When token is valid and id exists", () => {
    it("returns the volunteer", async () => {
      const { id } = volunteers[1];
      const volunteer = volunteers[1];
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get(`/api/volunteers/${id}`)
        .set("x-access-token", token);

      res.should.have.status(200);
      expect(res.body.id).to.eql(volunteer.id);
      expect(res.body.name).to.eql(volunteer.name);
      expect(res.body.email).to.eql(volunteer.email);
    });
  });

  describe("When token is invalid and id exists", () => {
    it("returns error", async () => {
      const { id } = volunteers[1];
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get(`/api/volunteers/${id}`)
        .set("x-access-token", "invalid_token");

      res.should.have.status(500);
      res.body.should.not.be.a("array");
      expect(res.error.text).to.include("Failed");
    });
  });

  describe("When token is not passed and id exists", () => {
    it("returns unauthorized", async () => {
      const { id } = volunteers[1];
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get(`/api/volunteers/${id}`);

      res.should.have.status(401);
      res.body.should.not.be.a("array");
      expect(res.error.text).to.include("No");
      expect(res.error.text).to.include("provided");
    });
  });

  describe("When token is valid and id doesn't exist", () => {
    it("returns empty", async () => {
      const id = volunteers[1].id + 500;
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get(`/api/volunteers/${id}`)
        .set("x-access-token", token);

      res.should.have.status(200);
      expect(res.body).to.eql(null);
    });
  });
});

describe("/POST Volunteers", () => {
  const baseVolunteerInfo = {
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
    areaIds: [],
    teamIds: [],
  };

  describe("When token is valid and body is correct", () => {
    it("creates the volunteer and return it", async () => {
      const volunteerInfo = {
        ...baseVolunteerInfo,
        email: `1${baseVolunteerInfo.email}`,
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/volunteers/")
        .set("x-access-token", token)
        .send(volunteerInfo);

      const volunteerFromDatabase = await Volunteer.Model.findOne({
        where: { email: volunteerInfo.email },
      });

      res.should.have.status(200);
      expect(res.body.id).to.eq(volunteerFromDatabase.id);
      expect(res.body.name).to.eq(volunteerInfo.name);
      expect(res.body.email).to.eq(volunteerInfo.email);
    });
  });

  describe("When token is invalid and body is correct", () => {
    it("returns error", async () => {
      const volunteerInfo = {
        ...baseVolunteerInfo,
        email: `2${baseVolunteerInfo.email}`,
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/volunteers/")
        .set("x-access-token", "invalid token")
        .send(volunteerInfo);

      res.should.have.status(500);
      expect(res.error.text).to.include("Failed");
    });
  });

  describe("When token is not passed and body is correct", () => {
    it("returns unauthorized", async () => {
      const volunteerInfo = {
        ...baseVolunteerInfo,
        email: `3${baseVolunteerInfo.email}`,
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/volunteers/")
        .send(volunteerInfo);

      res.should.have.status(401);
      expect(res.error.text).to.include("No");
      expect(res.error.text).to.include("provided");
    });
  });

  describe("When token is valid and body is missing required param (name)", () => {
    it("returns error", async () => {
      const volunteerInfo = {
        ...baseVolunteerInfo,
        email: `4${baseVolunteerInfo.email}`,
      };
      delete volunteerInfo.name;

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/volunteers/")
        .set("x-access-token", token)
        .send(volunteerInfo);

      const volunteerFromDatabase = await Volunteer.Model.findOne({
        where: { email: volunteerInfo.email },
      });

      res.should.have.status(400);
      expect(res.error.text).to.include("name");
      expect(volunteerFromDatabase).to.eq(null);
    });
  });

  describe("When token is valid but the email is already being used", () => {
    it("returns error", async () => {
      const volunteerInfo = {
        ...baseVolunteerInfo,
        email: `${volunteers[0].email}`,
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/volunteers/")
        .set("x-access-token", token)
        .send(volunteerInfo);

      res.should.have.status(500);
      expect(res.error.text).to.include("email");
    });
  });
});

describe("/PUT :id Volunteers", () => {
  let baseVolunteerInfo = {};
  before((done) => {
    baseVolunteerInfo = {
      name: volunteers[1].name,
      address: volunteers[1].address,
      city: volunteers[1].city,
      state: volunteers[1].state,
      country: volunteers[1].country,
      occupation: volunteers[1].occupation,
      birthDate: volunteers[1].birthDate,
      hireDate: volunteers[1].hireDate,
      phone: volunteers[1].phone,
      email: volunteers[1].email,
      additionalInfo: volunteers[1].additionalInfo,
      areaIds: [],
      teamIds: [],
    };
    done();
  });

  describe("When token is valid and body is correct", () => {
    it("updates the volunteer and return it", async () => {
      const volunteerInfo = {
        ...baseVolunteerInfo,
        city: "Salvador",
        phone: 5511966666666,
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/volunteers/${volunteers[1].id}`)
        .set("x-access-token", token)
        .send(volunteerInfo);

      const volunteerFromDatabase = await Volunteer.Model.findOne({
        where: { email: volunteerInfo.email },
      });

      res.should.have.status(200);
      expect(res.body.id).to.eq(volunteerFromDatabase.id);
      expect(res.body.city).to.eq(volunteerInfo.city);
      expect(res.body.phone).to.eq(volunteerInfo.phone);
      expect(res.body.email).to.eq(volunteerInfo.email);
    });
  });

  describe("When token is invalid and body is correct", () => {
    it("returns error", async () => {
      const volunteerInfo = {
        ...baseVolunteerInfo,
        city: "Salvador2",
        phone: 5511966666662,
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/volunteers/${volunteers[1].id}`)
        .set("x-access-token", "invalid_token")
        .send(volunteerInfo);

      const volunteerFromDatabase = await Volunteer.Model.findOne({
        where: { email: volunteerInfo.email },
      });

      res.should.have.status(500);
      expect(res.error.text).to.include("Failed");
      expect(volunteerFromDatabase.city).to.not.eq(volunteerInfo.city);
      expect(volunteerFromDatabase.phone).to.not.eq(volunteerInfo.phone);
    });
  });

  describe("When token is not passed and body is correct", () => {
    it("returns unauthorized", async () => {
      const volunteerInfo = {
        ...baseVolunteerInfo,
        city: "Salvador3",
        phone: 5511966666663,
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/volunteers/${volunteers[1].id}`)
        .send(volunteerInfo);

      const volunteerFromDatabase = await Volunteer.Model.findOne({
        where: { email: volunteerInfo.email },
      });

      res.should.have.status(401);
      expect(res.error.text).to.include("No");
      expect(res.error.text).to.include("provided");
      expect(volunteerFromDatabase.city).to.not.eq(volunteerInfo.city);
      expect(volunteerFromDatabase.phone).to.not.eq(volunteerInfo.phone);
    });
  });

  describe("When token is valid and body is missing required param (name)", () => {
    it("returns error", async () => {
      const volunteerInfo = {
        ...baseVolunteerInfo,
        city: "Salvador4",
        phone: 5511966666664,
      };
      delete volunteerInfo.name;

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/volunteers/${volunteers[1].id}`)
        .set("x-access-token", token)
        .send(volunteerInfo);

      const volunteerFromDatabase = await Volunteer.Model.findOne({
        where: { email: volunteerInfo.email },
      });

      res.should.have.status(400);
      expect(res.error.text).to.include("name");
      expect(volunteerFromDatabase.city).to.not.eq(volunteerInfo.city);
      expect(volunteerFromDatabase.phone).to.not.eq(volunteerInfo.phone);
    });
  });

  describe("When token is valid but the email is already being used", () => {
    it("returns error", async () => {
      const volunteerInfo = {
        ...baseVolunteerInfo,
        city: "Salvador5",
        phone: 5511966666665,
        email: volunteers[2].email,
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/volunteers/${volunteers[1].id}`)
        .set("x-access-token", token)
        .send(volunteerInfo);

      const volunteerFromDatabase = await Volunteer.Model.findOne({
        where: { email: volunteers[1].email },
      });

      res.should.have.status(500);
      expect(res.error.text).to.include("email");
      expect(volunteerFromDatabase.city).to.not.eq(volunteerInfo.city);
      expect(volunteerFromDatabase.phone).to.not.eq(volunteerInfo.phone);
    });
  });
});

describe("/DELETE :id Volunteers", () => {
  describe("When token is valid and id exists", () => {
    it("deletes the volunteer", async () => {
      const { id } = volunteers[0];

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .delete(`/api/volunteers/${id}`)
        .set("x-access-token", token);

      const volunteerFromDatabase = await Volunteer.Model.findByPk(id);

      res.should.have.status(200);
      expect(res.body.message).to.include("Destroyed");
      expect(volunteerFromDatabase).to.eq(null);
    });
  });

  describe("When token is invalid and id exists", () => {
    it("returns error", async () => {
      const { id } = volunteers[1];

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .delete(`/api/volunteers/${id}`)
        .set("x-access-token", "invalid_token");

      const volunteerFromDatabase = await Volunteer.Model.findByPk(id);

      res.should.have.status(500);
      expect(res.error.text).to.include("Failed");
      expect(volunteerFromDatabase).to.not.eq(null);
      expect(volunteerFromDatabase.id).to.eq(id);
    });
  });

  describe("When token is not passed and id exists", () => {
    it("returns unauthorized", async () => {
      const { id } = volunteers[2];

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .delete(`/api/volunteers/${id}`);

      const volunteerFromDatabase = await Volunteer.Model.findByPk(id);

      res.should.have.status(401);
      expect(res.error.text).to.include("No");
      expect(res.error.text).to.include("provided");
      expect(volunteerFromDatabase).to.not.eq(null);
      expect(volunteerFromDatabase.id).to.eq(id);
    });
  });

  describe("When token is valid and id doesn't exist", () => {
    it("returns error", async () => {
      const id = volunteers[0].id + 500;

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .delete(`/api/volunteers/${id}`)
        .set("x-access-token", token);

      const volunteerFromDatabase = await Volunteer.Model.findByPk(id);

      res.should.have.status(500);
      expect(res.error).to.be.an("error");
      expect(volunteerFromDatabase).to.eq(null);
    });
  });

  after(async () => {
    await areaVolunteers.Model.destroy({ where: {} });
    await teamVolunteers.Model.destroy({ where: {} });
    await teams.Model.destroy({ where: {} });
    await areas.Model.destroy({ where: {} });
    await Volunteer.Model.destroy({ where: {} });
  });
});
