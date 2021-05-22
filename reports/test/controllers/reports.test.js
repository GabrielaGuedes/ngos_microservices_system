/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
process.env.NODE_ENV = "test";
process.env.FINANCIAL_SERVER_URL = "http://localhost:7000";
process.env.LOGIN_URL = "http://localhost:2000/api/login";
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

let config = {};
let token = "";

describe("/GET charts", () => {
  before(async () => {
    await Config.Model.remove({});

    token = await getTokenForTests();

    config = await new Config.Model({
      allowExport: true,
      allowCharts: true,
    })
      .save()
      .then((doc) => doc);
  });

  describe("When charts are allowed", () => {
    it("returns the transactions grouped by origin", async () => {
      const groupedTransactions = await chai
        .request(`http://localhost:${process.env.FINANCIAL_SERVER_PORT}`)
        .get("/api/grouped-transactions/by-origin/?showCanceled=true")
        .set("x-access-token", token);

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/reports/charts");

      res.should.have.status(200);
      res.body.should.be.a("array");
      expect(res.body.length).to.eq(groupedTransactions.body.length);
      expect(res.body[0].totalValue).to.eql(
        groupedTransactions.body[0].totalValue
      );
    });
  });

  describe("When charts are not allowed", () => {
    before(async () => {
      await Config.Model.remove({});

      config = await new Config.Model({
        allowExport: false,
        allowCharts: false,
      })
        .save()
        .then((doc) => doc);
    });

    it("returns forbidden", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/reports/charts");

      res.should.have.status(403);
      expect(res.error.text).to.include("Not");
      expect(res.error.text).to.include("allowed");
    });
  });

  after((done) => {
    mongoose.connection.dropDatabase(process.env.TEST_DB);
    done();
  });
});

describe("/POST export", () => {
  before(async () => {
    await Config.Model.remove({});

    config = await new Config.Model({
      allowExport: true,
      allowCharts: true,
    })
      .save()
      .then((doc) => doc);
  });

  describe("When export is allowed", () => {
    it("returns the sheet file", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/reports/export");

      res.should.have.status(200);
      expect(res.type).to.eq(
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
    });
  });

  describe("When export is not allowed", () => {
    before(async () => {
      await Config.Model.remove({});

      config = await new Config.Model({
        allowExport: false,
        allowCharts: false,
      })
        .save()
        .then((doc) => doc);
    });

    it("returns forbidden", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/reports/export");

      res.should.have.status(403);
      expect(res.error.text).to.include("Not");
      expect(res.error.text).to.include("allowed");
    });
  });

  after((done) => {
    mongoose.connection.dropDatabase(process.env.TEST_DB);
    done();
  });
});
