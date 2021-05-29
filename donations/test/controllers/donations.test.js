/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
process.env.LOGIN_URL = `http://localhost:${process.env.AUTHENTICATION_PORT}/api/login`;
process.env.FINANCIAL_TRANSACTIONS_URL = `http://localhost:${process.env.FINANCIAL_PORT}/api/transactions`;
process.env.SERVICES_SETTINGS_URL = `http://localhost:${process.env.SETTINGS_PORT}/api/services`;
const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");
const Donation = require("../../models/donations");
const Donator = require("../../models/donators");
require("../../config/db");
require("../../index");

const { expect } = chai;
const should = chai.should();

chai.use(chaiHttp);
describe("/POST Charge credit card", () => {
  beforeEach(async () => {
    await Donation.Model.remove({});
    await Donator.Model.remove({});
  });

  describe("When body is correct", () => {
    it("Charges the credit card, creates a donation and a donator", async () => {
      const chargeInfo = {
        name: "Example Name",
        birthDate: "1990-01-01T20:20:39+00:00",
        occupation: "Software Engineer",
        motivation: "Any reason here",
        city: "São Paulo",
        state: "SP",
        country: "Brazil",
        email: "example@test.com",
        phone: 5511999999999,
        donatedValue: 50.0,
        creditCardNumber: 4111111111111111,
        cvv: 123,
        expireMonth: "12",
        expireYear: "2030",
      };
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/donations/charge-credit-card")
        .send(chargeInfo);

      const donation = await Donation.Model.find();
      const donator = await Donator.Model.find();

      res.should.have.status(200);
      expect(donation.length).to.eql(1);
      expect(String(donation[0]._id)).to.eq(res.body.donationId);
      expect(donator.length).to.eql(1);
      expect(String(donator[0]._id)).to.eq(res.body.donatorId);
    });
  });

  describe("When body is missing required param (birthDate) from donator", () => {
    it("Returns bad request", async () => {
      const chargeInfo = {
        name: "Example Name",
        occupation: "Software Engineer",
        motivation: "Any reason here",
        city: "São Paulo",
        state: "SP",
        country: "Brazil",
        email: "example@test.com",
        phone: 5511999999999,
        donatedValue: 50.0,
        creditCardNumber: 4111111111111111,
        cvv: 123,
        expireMonth: "12",
        expireYear: "2030",
      };
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/donations/charge-credit-card")
        .send(chargeInfo);

      const donation = await Donation.Model.find();
      const donator = await Donator.Model.find();

      res.should.have.status(400);
      expect(res.error.text).to.include("birthDate");
      expect(donation.length).to.eql(0);
      expect(donator.length).to.eql(0);
    });
  });

  describe("When body is missing required param (donatedValue) from donation", () => {
    it("Returns bad request", async () => {
      const chargeInfo = {
        name: "Example Name",
        birthDate: "1990-01-01T20:20:39+00:00",
        occupation: "Software Engineer",
        motivation: "Any reason here",
        city: "São Paulo",
        state: "SP",
        country: "Brazil",
        email: "example@test.com",
        phone: 5511999999999,
        creditCardNumber: 4111111111111111,
        cvv: 123,
        expireMonth: "12",
        expireYear: "2030",
      };
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/donations/charge-credit-card")
        .send(chargeInfo);

      const donation = await Donation.Model.find();
      const donator = await Donator.Model.find();

      res.should.have.status(400);
      expect(res.error.text).to.include("donatedValue");
      expect(donation.length).to.eql(0);
      expect(donator.length).to.eql(0);
    });
  });

  describe("When body is missing required param from both donator and donation", () => {
    it("Returns bad request", async () => {
      const chargeInfo = {
        name: "Example Name",
        occupation: "Software Engineer",
        motivation: "Any reason here",
        city: "São Paulo",
        state: "SP",
        country: "Brazil",
        email: "example@test.com",
        phone: 5511999999999,
        creditCardNumber: 4111111111111111,
        cvv: 123,
        expireMonth: "12",
        expireYear: "2030",
      };
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/donations/charge-credit-card")
        .send(chargeInfo);

      const donation = await Donation.Model.find();
      const donator = await Donator.Model.find();

      res.should.have.status(400);
      expect(res.error.text).to.include("donatedValue");
      expect(donation.length).to.eql(0);
      expect(donator.length).to.eql(0);
    });
  });

  describe("When credit card is invalid", () => {
    it("Returns internal server error", async () => {
      const chargeInfo = {
        name: "Example Name",
        birthDate: "1990-01-01T20:20:39+00:00",
        occupation: "Software Engineer",
        motivation: "Any reason here",
        city: "São Paulo",
        state: "SP",
        country: "Brazil",
        email: "example@test.com",
        phone: 5511999999999,
        donatedValue: 50.0,
        creditCardNumber: 4222222222222222,
        cvv: 123,
        expireMonth: "12",
        expireYear: "2030",
      };
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/donations/charge-credit-card")
        .send(chargeInfo);

      const donation = await Donation.Model.find();
      const donator = await Donator.Model.find();

      res.should.have.status(500);
      expect(donation.length).to.eq(0);
      expect(donator.length).to.eq(0);
    });
  });

  after((done) => {
    mongoose.connection.dropDatabase(process.env.TEST_DB);
    done();
  });
});

describe("/GET Donations", () => {
  let token = "";
  const donations = [];

  before(async () => {
    await Donation.Model.remove({});

    const res = await chai
      .request(`http://localhost:${process.env.AUTHENTICATION_PORT}`)
      .post("/api/login")
      .send({
        email: "test@example.com",
        password: "password1234",
      });

    token = res.body.token;

    donations.push(
      await new Donation.Model({
        donationId: "1",
        status: "PAID",
        amount: 25.0,
        donatorEmail: "example@test.com",
        source: "CREDIT_CARD",
      })
        .save()
        .then((doc) => doc)
    );
    donations.push(
      await new Donation.Model({
        donationId: "2",
        status: "PAID",
        amount: 5.0,
        donatorEmail: "cexample@test.com",
        source: "CREDIT_CARD",
      })
        .save()
        .then((doc) => doc)
    );
    donations.push(
      await new Donation.Model({
        donationId: "3",
        status: "PAID",
        amount: 100.0,
        donatorEmail: "bexample@test.com",
        source: "BOLETO",
      })
        .save()
        .then((doc) => doc)
    );
    donations.push(
      await new Donation.Model({
        donationId: "4",
        status: "WAITING",
        amount: 25.0,
        donatorEmail: "dexample@test.com",
        source: "BOLETO",
      })
        .save()
        .then((doc) => doc)
    );
    donations.push(
      await new Donation.Model({
        donationId: "5",
        status: "EXPIRED",
        amount: 30.0,
        donatorEmail: "fexample@test.com",
        source: "BOLETO",
      })
        .save()
        .then((doc) => doc)
    );
    donations.push(
      await new Donation.Model({
        donationId: "6",
        status: "REJECTED",
        amount: 25.2,
        donatorEmail: "gexample@test.com",
        source: "CREDIT_CARD",
      })
        .save()
        .then((doc) => doc)
    );
  });

  describe("When token is passed correctly and there are no params", () => {
    it("Returns all donations", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/donations/")
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.donations.should.be.a("array");
      expect(res.body.donations.length).to.eq(donations.length);
      expect(res.body.donations.map((don) => don._id)).to.eql(
        donations.map((don) => String(don._id))
      );
      expect(res.body.total).to.eql(
        donations.map((don) => don.amount).reduce((total, don) => total + don)
      );
    });
  });

  describe("When token is not passed and there are no params", () => {
    it("Returns unauthorized", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/donations/");

      res.should.have.status(401);
      expect(res.error.text).to.include("No");
      expect(res.error.text).to.include("provided");
    });
  });

  describe("When token is wrong and there are no params", () => {
    it("Returns error", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/donations/")
        .set("x-access-token", "wrong token");

      res.should.have.status(500);
      expect(res.error.text).to.include("Failed");
    });
  });

  describe("When token is passed correctly and with paid filter as true", () => {
    it("Returns only paid donations", async () => {
      const paidDonations = donations.filter((don) => don.status === "PAID");
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/donations/")
        .query({ paid: "true" })
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.donations.should.be.a("array");
      expect(res.body.donations.length).to.eq(paidDonations.length);
      expect(res.body.donations.map((don) => don._id)).to.eql(
        paidDonations.map((don) => String(don._id))
      );
      expect(res.body.total).to.eql(
        paidDonations
          .map((don) => don.amount)
          .reduce((total, don) => total + don)
      );
    });
  });

  describe("When token is passed correctly and with paid filter as false", () => {
    it("Returns only not paid donations", async () => {
      const notPaidDonations = donations.filter((don) => don.status !== "PAID");
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/donations/")
        .query({ paid: "false" })
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.donations.should.be.a("array");
      expect(res.body.donations.length).to.eq(notPaidDonations.length);
      expect(res.body.donations.map((don) => don._id)).to.eql(
        notPaidDonations.map((don) => String(don._id))
      );
      expect(res.body.total).to.eql(
        notPaidDonations
          .map((don) => don.amount)
          .reduce((total, don) => total + don)
      );
    });
  });

  describe("When token is passed correctly and with source filter", () => {
    it("Returns only not paid donations", async () => {
      const source = "CREDIT_CARD";
      const creditCardDonations = donations.filter(
        (don) => don.source === "CREDIT_CARD"
      );

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/donations/")
        .query({ source })
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.donations.should.be.a("array");
      expect(res.body.donations.length).to.eq(creditCardDonations.length);
      expect(res.body.donations.map((don) => don._id)).to.eql(
        creditCardDonations.map((don) => String(don._id))
      );
      expect(res.body.total).to.eql(
        creditCardDonations
          .map((don) => don.amount)
          .reduce((total, don) => total + don)
      );
    });
  });

  describe("When token is passed correctly and with minimum value filter", () => {
    it("Returns only donations more than minimum", async () => {
      const minValue = 15;
      const donationsWithMinValue = donations.filter(
        (donation) => donation.amount >= minValue
      );
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/donations")
        .query({ minValue })
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.donations.should.be.a("array");
      expect(res.body.donations.length).to.eq(donationsWithMinValue.length);
      expect(res.body.donations.map((don) => don._id)).to.eql(
        donationsWithMinValue.map((don) => String(don._id))
      );
      expect(res.body.total).to.eql(
        donationsWithMinValue
          .map((don) => don.amount)
          .reduce((total, don) => total + don)
      );
    });
  });

  describe("When token is passed correctly and with maximum value filter", () => {
    it("Returns only donations more than maximum", async () => {
      const maxValue = 15;
      const donationsWithMaxValue = donations.filter(
        (donation) => donation.amount <= maxValue
      );
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/donations")
        .query({ maxValue })
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.donations.should.be.a("array");
      expect(res.body.donations.length).to.eq(donationsWithMaxValue.length);
      expect(res.body.donations.map((don) => don._id)).to.eql(
        donationsWithMaxValue.map((don) => String(don._id))
      );
      expect(res.body.total).to.eql(
        donationsWithMaxValue
          .map((don) => don.amount)
          .reduce((total, don) => total + don)
      );
    });
  });

  describe("When token is passed correctly and in value range", () => {
    it("Returns only donations more than maximum", async () => {
      const maxValue = 150;
      const minValue = 15;
      const donationsInRange = donations.filter(
        (donation) => donation.amount <= maxValue && donation.amount >= minValue
      );
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/donations")
        .query({ maxValue, minValue })
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.donations.should.be.a("array");
      expect(res.body.donations.length).to.eq(donationsInRange.length);
      expect(res.body.donations.map((don) => don._id)).to.eql(
        donationsInRange.map((don) => String(don._id))
      );
      expect(res.body.total).to.eql(
        donationsInRange
          .map((don) => don.amount)
          .reduce((total, don) => total + don)
      );
    });
  });

  describe("When token is passed correctly and sorted by amount", () => {
    it("Returns all donations sorted by amount", async () => {
      const sortBy = "amount";
      const sortedDonationsAmount = donations
        .map((donation) => donation.amount)
        .sort((a, b) => a - b);

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/donations/")
        .query({ sortBy })
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.donations.should.be.a("array");
      expect(res.body.donations.length).to.eq(sortedDonationsAmount.length);
      expect(res.body.donations.map((don) => don.amount)).to.eql(
        sortedDonationsAmount
      );
      expect(res.body.total).to.eql(
        sortedDonationsAmount.reduce((total, don) => total + don)
      );
    });
  });

  after((done) => {
    mongoose.connection.dropDatabase(process.env.TEST_DB);
    done();
  });
});
