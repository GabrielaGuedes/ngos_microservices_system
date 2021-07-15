/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
process.env.NODE_ENV = "test";
const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");
const Service = require("../../models/services");
const { getTokenForTests } = require("../../utils/get-token-for-tests");
const { servicesDefault } = require("../../utils/default-values");
require("../../config/db");
require("../../index");

const { expect } = chai;
const should = chai.should();

chai.use(chaiHttp);

let token = "";
let service = {};

describe("/GET services", () => {
  before(async () => {
    await Service.Model.remove({});

    service = await new Service.Model(servicesDefault)
      .save()
      .then((doc) => doc);
  });

  describe("When request is ok", () => {
    it("returns the current service", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/services/");

      res.should.have.status(200);
      expect(res.body.donations).to.eq(service.donations);
      expect(res.body.employees).to.eq(service.employees);
      expect(res.body.volunteers).to.eq(service.volunteers);
    });
  });

  describe("when there is no record in database", async () => {
    before(async () => {
      await Service.Model.remove({});
    });

    it("returns empty object", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/services/");

      res.should.have.status(200);
      expect(res.body).to.eql(servicesDefault);
    });
  });

  after((done) => {
    mongoose.connection.dropDatabase(process.env.TEST_DB);
    done();
  });
});

describe("/POST services", () => {
  beforeEach(async () => {
    await Service.Model.remove({});

    token = await getTokenForTests();

    service = await new Service.Model({
      ...servicesDefault,
      donations: false,
    })
      .save()
      .then((doc) => doc);
  });

  describe("When token and params are correct", () => {
    it("updates the current service", async () => {
      const body = {
        donations: true,
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/services/")
        .set("x-access-token", token)
        .send(body);
      const recordFromDatabase = await Service.Model.findOne({ current: true });

      res.should.have.status(200);
      expect(res.body.donations).to.eq(body.donations);
      expect(res.body.employees).to.eq(servicesDefault.employees);
      expect(res.body.volunteers).to.eq(servicesDefault.volunteers);
      expect(recordFromDatabase.donations).to.eq(body.donations);
      expect(recordFromDatabase.employees).to.eq(servicesDefault.employees);
      expect(recordFromDatabase.volunteers).to.eq(servicesDefault.volunteers);
    });
  });

  describe("When token is not passed", () => {
    it("returns unauthorized", async () => {
      const body = {
        donations: true,
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/services/")
        .send(body);

      res.should.have.status(401);
      expect(res.error.text).to.include("No");
      expect(res.error.text).to.include("provided");
    });
  });

  describe("When token is invalid", () => {
    it("returns error", async () => {
      const body = {
        donations: true,
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/services/")
        .set("x-access-token", "invalid token")
        .send(body);

      res.should.have.status(500);
      res.body.should.not.be.a("array");
      expect(res.error.text).to.include("Failed");
    });
  });

  describe("when there is no record in database", async () => {
    before(async () => {
      await Service.Model.remove({});
    });

    it("creates a new one", async () => {
      const body = {
        donations: true,
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/services/")
        .set("x-access-token", token)
        .send(body);
      const recordFromDatabase = await Service.Model.findOne({ current: true });

      res.should.have.status(200);
      expect(res.body.donations).to.eq(body.donations);
      expect(res.body.volunteers).to.eq(servicesDefault.volunteers);
      expect(res.body.employees).to.eq(servicesDefault.employees);
      expect(recordFromDatabase.donations).to.eq(body.donations);
      expect(recordFromDatabase.volunteers).to.eq(servicesDefault.volunteers);
      expect(recordFromDatabase.employees).to.eq(servicesDefault.employees);
    });
  });

  after((done) => {
    mongoose.connection.dropDatabase(process.env.TEST_DB);
    done();
  });
});
