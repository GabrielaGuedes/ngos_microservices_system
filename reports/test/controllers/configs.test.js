/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
process.env.NODE_ENV = "test";
const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");
const Config = require("../../models/configs");
const { getTokenForTests } = require("../../utils/get-token-for-tests");
require("../../config/db");
require("../../index");

const { expect } = chai;
const should = chai.should();

chai.use(chaiHttp);

let token = "";
let config = {};

describe("/GET configs", () => {
  before(async () => {
    await Config.Model.remove({});

    token = await getTokenForTests();

    config = await new Config.Model({
      allowExport: false,
      allowCharts: true,
    })
      .save()
      .then((doc) => doc);
  });

  describe("When token is correct", () => {
    it("returns the current config", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/configs/")
        .set("x-access-token", token);

      res.should.have.status(200);
      expect(res.body.allowCharts).to.eq(config.allowCharts);
      expect(res.body.allowExport).to.eq(config.allowExport);
    });
  });

  describe("When token is not passed", () => {
    it("returns unauthorized", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/configs/");

      res.should.have.status(401);
      expect(res.error.text).to.include("No");
      expect(res.error.text).to.include("provided");
    });
  });

  describe("When token is invalid", () => {
    it("returns error", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/configs/")
        .set("x-access-token", "invalid token");

      res.should.have.status(500);
      res.body.should.not.be.a("array");
      expect(res.error.text).to.include("Failed");
    });
  });

  describe("when there is no record in database", async () => {
    before(async () => {
      await Config.Model.remove({});
    });

    it("returns the default value", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/configs/")
        .set("x-access-token", token);

      res.should.have.status(200);
      expect(res.body).to.eql({ allowCharts: true, allowExport: true });
    });
  });

  after((done) => {
    mongoose.connection.dropDatabase(process.env.TEST_DB);
    done();
  });
});

describe("/POST configs", () => {
  before(async () => {
    await Config.Model.remove({});

    token = await getTokenForTests();

    config = await new Config.Model({
      allowExport: false,
      allowCharts: true,
    })
      .save()
      .then((doc) => doc);
  });

  describe("When token and params are correct", () => {
    it("updates the current config", async () => {
      const body = {
        allowExport: true,
        allowCharts: false,
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/configs/")
        .set("x-access-token", token)
        .send(body);
      const recordFromDatabase = await Config.Model.findOne({ current: true });

      res.should.have.status(200);
      expect(res.body.allowCharts).to.eq(body.allowCharts);
      expect(res.body.allowExport).to.eq(body.allowExport);
      expect(recordFromDatabase.allowCharts).to.eq(body.allowCharts);
      expect(recordFromDatabase.allowExport).to.eq(body.allowExport);
    });
  });

  describe("When token is not passed", () => {
    it("returns unauthorized", async () => {
      const body = {
        allowExport: true,
        allowCharts: false,
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/configs/")
        .send(body);

      res.should.have.status(401);
      expect(res.error.text).to.include("No");
      expect(res.error.text).to.include("provided");
    });
  });

  describe("When token is invalid", () => {
    it("returns error", async () => {
      const body = {
        allowExport: true,
        allowCharts: false,
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/configs/")
        .set("x-access-token", "invalid token")
        .send(body);

      res.should.have.status(500);
      res.body.should.not.be.a("array");
      expect(res.error.text).to.include("Failed");
    });
  });

  describe("when there is no record in database", async () => {
    before(async () => {
      await Config.Model.remove({});
    });

    it("creates a new one", async () => {
      const body = {
        allowExport: true,
        allowCharts: false,
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/configs/")
        .set("x-access-token", token)
        .send(body);
      const recordFromDatabase = await Config.Model.findOne({ current: true });

      res.should.have.status(200);
      expect(res.body.allowCharts).to.eq(body.allowCharts);
      expect(res.body.allowExport).to.eq(body.allowExport);
      expect(recordFromDatabase.allowCharts).to.eq(body.allowCharts);
      expect(recordFromDatabase.allowExport).to.eq(body.allowExport);
    });
  });

  after((done) => {
    mongoose.connection.dropDatabase(process.env.TEST_DB);
    done();
  });
});
