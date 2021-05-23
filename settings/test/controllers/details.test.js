/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
process.env.NODE_ENV = "test";
const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");
const Detail = require("../../models/details");
const { getTokenForTests } = require("../../utils/get-token-for-tests");
require("../../config/db");
require("../../index");

const { expect } = chai;
const should = chai.should();

chai.use(chaiHttp);

let token = "";
let detail = {};

const defaultValues = {
  name: "ONG",
  mainColor: "#00b2b5",
  backgroundColor: "#f0ffff",
  fontsColor: "#000000",
};

describe("/GET details", () => {
  before(async () => {
    await Detail.Model.remove({});

    token = await getTokenForTests();

    detail = await new Detail.Model(defaultValues).save().then((doc) => doc);
  });

  describe("When token is correct", () => {
    it("returns the current detail", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/details/")
        .set("x-access-token", token);

      res.should.have.status(200);
      expect(res.body.name).to.eq(detail.name);
      expect(res.body.mainColor).to.eq(detail.mainColor);
      expect(res.body.backgroundColor).to.eq(detail.backgroundColor);
    });
  });

  describe("When token is not passed", () => {
    it("returns unauthorized", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/details/");

      res.should.have.status(401);
      expect(res.error.text).to.include("No");
      expect(res.error.text).to.include("provided");
    });
  });

  describe("When token is invalid", () => {
    it("returns error", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/details/")
        .set("x-access-token", "invalid token");

      res.should.have.status(500);
      res.body.should.not.be.a("array");
      expect(res.error.text).to.include("Failed");
    });
  });

  describe("when there is no record in database", async () => {
    before(async () => {
      await Detail.Model.remove({});
    });

    it("returns empty object", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/details/")
        .set("x-access-token", token);

      res.should.have.status(200);
      expect(res.body).to.eql(defaultValues);
    });
  });

  after((done) => {
    mongoose.connection.dropDatabase(process.env.TEST_DB);
    done();
  });
});

describe("/POST details", () => {
  beforeEach(async () => {
    await Detail.Model.remove({});

    token = await getTokenForTests();

    detail = await new Detail.Model({
      ...defaultValues,
      name: "Another name for ONG",
    })
      .save()
      .then((doc) => doc);
  });

  describe("When token and params are correct", () => {
    it("updates the current detail", async () => {
      const body = {
        name: "New name",
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/details/")
        .set("x-access-token", token)
        .send(body);
      const recordFromDatabase = await Detail.Model.findOne({ current: true });

      res.should.have.status(200);
      expect(res.body.name).to.eq(body.name);
      expect(res.body.mainColor).to.eq(defaultValues.mainColor);
      expect(res.body.backgroundColor).to.eq(defaultValues.backgroundColor);
      expect(recordFromDatabase.name).to.eq(body.name);
      expect(recordFromDatabase.mainColor).to.eq(defaultValues.mainColor);
      expect(recordFromDatabase.backgroundColor).to.eq(
        defaultValues.backgroundColor
      );
    });
  });

  describe("When token is not passed", () => {
    it("returns unauthorized", async () => {
      const body = {
        name: "New name",
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/details/")
        .send(body);

      res.should.have.status(401);
      expect(res.error.text).to.include("No");
      expect(res.error.text).to.include("provided");
    });
  });

  describe("When token is invalid", () => {
    it("returns error", async () => {
      const body = {
        name: "New name",
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/details/")
        .set("x-access-token", "invalid token")
        .send(body);

      res.should.have.status(500);
      res.body.should.not.be.a("array");
      expect(res.error.text).to.include("Failed");
    });
  });

  describe("when there is no record in database", async () => {
    before(async () => {
      await Detail.Model.remove({});
    });

    it("creates a new one", async () => {
      const body = {
        name: "New name",
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/details/")
        .set("x-access-token", token)
        .send(body);
      const recordFromDatabase = await Detail.Model.findOne({ current: true });

      res.should.have.status(200);
      expect(res.body.name).to.eq(body.name);
      expect(res.body.backgroundColor).to.eq(defaultValues.backgroundColor);
      expect(res.body.mainColor).to.eq(defaultValues.mainColor);
      expect(recordFromDatabase.name).to.eq(body.name);
      expect(recordFromDatabase.backgroundColor).to.eq(
        defaultValues.backgroundColor
      );
      expect(recordFromDatabase.mainColor).to.eq(defaultValues.mainColor);
    });
  });

  after((done) => {
    mongoose.connection.dropDatabase(process.env.TEST_DB);
    done();
  });
});
