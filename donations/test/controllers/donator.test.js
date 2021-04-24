/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");
const Donator = require("../../models/donators");
require("../../config/db");
require("../../index");

const { expect } = chai;
const should = chai.should();

chai.use(chaiHttp);
describe("/GET Donators", () => {
  let token = "";
  const donators = [];
  before(async () => {
    await Donator.Model.remove({});

    const res = await chai
      .request(`http://localhost:${process.env.AUTHENTICATION_PORT}`)
      .post("/api/login")
      .send({
        email: "test@example.com",
        password: "password1234",
      });

    token = res.body.token;

    donators.push(
      await new Donator.Model({
        name: "Example User",
        birthDate: "1990-01-01T20:20:39+00:00",
        occupation: "Software Engineer",
        motivation: "Any reason here",
        city: "Sao Paulo",
        state: "SP",
        country: "Brazil",
        email: "example@test.com",
        phone: 5511999999999,
        donatedValue: 10.0,
      })
        .save()
        .then((doc) => doc)
    );
    donators.push(
      await new Donator.Model({
        name: "A Example User",
        birthDate: "1991-01-01T20:20:39+00:00",
        occupation: "Data Engineer",
        motivation: "Any reason here",
        city: "Sao Paulo",
        state: "AC",
        country: "Brazil",
        email: "example1@test.com",
        phone: 5511999999999,
        donatedValue: 20.0,
      })
        .save()
        .then((doc) => doc)
    );
    donators.push(
      await new Donator.Model({
        name: "B Example User",
        birthDate: "1992-01-01T20:20:39+00:00",
        occupation: "Engineer",
        city: "Sao Paulo",
        state: "SP",
        country: "Brazil",
        email: "example2@test.com",
      })
        .save()
        .then((doc) => doc)
    );
    donators.push(
      await new Donator.Model({
        name: "C Example User",
        birthDate: "1990-01-01T20:20:39+00:00",
        occupation: "Software Engineer",
        motivation: "Any reason here",
        city: "City from Tuvalu",
        state: "AS",
        country: "Tuvalu",
        email: "example3@test.com",
        phone: 5511999999999,
        donatedValue: 100.0,
      })
        .save()
        .then((doc) => doc)
    );
    donators.push(
      await new Donator.Model({
        name: "D Example User",
        birthDate: "1993-01-01T20:20:39+00:00",
        occupation: "Developer",
        motivation: "Other reason here",
        city: "Rio de Janeiro",
        state: "RJ",
        country: "Brazil",
        email: "example4@test.com",
        phone: 5511999999999,
        donatedValue: 10.0,
      })
        .save()
        .then((doc) => doc)
    );
    donators.push(
      await new Donator.Model({
        name: "F Example User",
        birthDate: "1990-01-01T20:20:39+00:00",
        occupation: "Unemployed",
        motivation: "Any reason here",
        city: "Rio Branco",
        state: "AC",
        country: "Brazil",
        email: "example5@test.com",
        donatedValue: 2.0,
      })
        .save()
        .then((doc) => doc)
    );
  });

  describe("When token is passed correctly and there are no params", () => {
    it("Returns all donators", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/donators/")
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.should.be.a("array");
      expect(res.body.length).to.eq(donators.length);
      expect(res.body.map((don) => don._id)).to.eql(
        donators.map((don) => String(don._id))
      );
    });
  });

  describe("When token is not passed and there are no params", () => {
    it("Returns unauthorized", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/donators/");

      res.should.have.status(401);
      res.body.should.not.be.a("array");
      expect(res.error.text).to.include("No");
      expect(res.error.text).to.include("provided");
    });
  });

  describe("When token is wrong and there are no params", () => {
    it("Returns error", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/donators/")
        .set("x-access-token", "wrong token");

      res.should.have.status(500);
      res.body.should.not.be.a("array");
      expect(res.error.text).to.include("Failed");
    });
  });

  describe("When token is passed correctly and with city filter", () => {
    it("Returns only donators from city", async () => {
      const city = "Sao Paulo";
      const donatorsFromCity = donators.filter(
        (donator) => donator.city === city
      );
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/donators")
        .query({ city })
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.should.be.a("array");
      expect(res.body.length).to.eq(donatorsFromCity.length);
      expect(res.body.map((don) => don._id)).to.eql(
        donatorsFromCity.map((don) => String(don._id))
      );
    });
  });

  describe("When token is passed correctly and with state filter", () => {
    it("Returns only donators from state", async () => {
      const state = "SP";
      const donatorsFromState = donators.filter(
        (donator) => donator.state === state
      );
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/donators")
        .query({ state })
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.should.be.a("array");
      expect(res.body.length).to.eq(donatorsFromState.length);
      expect(res.body.map((don) => don._id)).to.eql(
        donatorsFromState.map((don) => String(don._id))
      );
    });
  });

  describe("When token is passed correctly and with country filter", () => {
    it("Returns only donators from country", async () => {
      const country = "Brazil";
      const donatorsFromCountry = donators.filter(
        (donator) => donator.country === country
      );
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/donators")
        .query({ country })
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.should.be.a("array");
      expect(res.body.length).to.eq(donatorsFromCountry.length);
      expect(res.body.map((don) => don._id)).to.eql(
        donatorsFromCountry.map((don) => String(don._id))
      );
    });
  });

  describe("When token is passed correctly and with minimum value filter", () => {
    it("Returns only donators that have donated more than minimum", async () => {
      const minValue = 15;
      const donatorsWithMinValue = donators.filter(
        (donator) => donator.donatedValue >= minValue
      );
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/donators")
        .query({ minValue })
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.should.be.a("array");
      expect(res.body.length).to.eq(donatorsWithMinValue.length);
      expect(res.body.map((don) => don._id)).to.eql(
        donatorsWithMinValue.map((don) => String(don._id))
      );
    });
  });

  describe("When token is passed correctly and with maximum value filter", () => {
    it("Returns only donators that have donated less than maximum", async () => {
      const maxValue = 15;
      const donatorsWithMaxValue = donators.filter(
        (donator) => donator.donatedValue <= maxValue
      );
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/donators")
        .query({ maxValue })
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.should.be.a("array");
      expect(res.body.length).to.eq(donatorsWithMaxValue.length);
      expect(res.body.map((don) => don._id)).to.eql(
        donatorsWithMaxValue.map((don) => String(don._id))
      );
    });
  });

  describe("When token is passed correctly and with minimum and maximum value filter", () => {
    it("Returns only donators that have donated between the minimum and maximum", async () => {
      const maxValue = 150;
      const minValue = 5;
      const donatorsWithValueInRange = donators.filter(
        (donator) =>
          donator.donatedValue <= maxValue && donator.donatedValue >= minValue
      );
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/donators")
        .query({ maxValue, minValue })
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.should.be.a("array");
      expect(res.body.length).to.eq(donatorsWithValueInRange.length);
      expect(res.body.map((don) => don._id)).to.eql(
        donatorsWithValueInRange.map((don) => String(don._id))
      );
    });
  });

  describe("When token is passed correctly and with all possible filters", () => {
    it("Returns only donators that attend all filters", async () => {
      const maxValue = 150;
      const minValue = 5;
      const city = "Sao Paulo";
      const state = "Sao Paulo";
      const country = "Sao Paulo";
      const donatorsThatAttend = donators.filter(
        (donator) =>
          donator.donatedValue <= maxValue &&
          donator.donatedValue <= minValue &&
          donator.city === city &&
          donator.state === state &&
          donator.country === country
      );
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/donators")
        .query({ maxValue, minValue, country, city, state })
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.should.be.a("array");
      expect(res.body.length).to.eq(donatorsThatAttend.length);
      expect(res.body.map((don) => don._id)).to.eql(
        donatorsThatAttend.map((don) => String(don._id))
      );
    });
  });

  describe("When token is passed correctly and sorted by occupation", () => {
    it("Returns all donators sorted", async () => {
      const sortBy = "occupation";
      const sortedDonatorsOccupation = donators
        .map((donator) => String(donator.occupation))
        .sort();
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/donators/")
        .query({ sortBy })
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.should.be.a("array");
      expect(res.body.length).to.eq(donators.length);
      expect(res.body.map((don) => String(don.occupation))).to.eql(
        sortedDonatorsOccupation
      );
    });
  });

  describe("When token is passed correctly and sorted by name", () => {
    it("Returns all donators sorted by name", async () => {
      const sortBy = "name";
      const sortedDonatorsName = donators
        .map((donator) => String(donator.name))
        .sort();
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/donators/")
        .query({ sortBy })
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.should.be.a("array");
      expect(res.body.length).to.eq(donators.length);
      expect(res.body.map((don) => don.name)).to.eql(sortedDonatorsName);
    });
  });

  after((done) => {
    mongoose.connection.dropDatabase(process.env.TEST_DB);
    done();
  });
});
