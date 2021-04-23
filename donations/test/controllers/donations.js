/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
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
    it("Charges the credit card, creates a donation and a donator", () => {
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
      chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/donations/charge-credit-card")
        .send(chargeInfo)
        .end(async (_err, res) => {
          const donation = await Donation.Model.find();
          const donator = await Donator.Model.find();

          res.should.have.status(200);
          expect(donation.length).to.eql(1);
          expect(donation[0]._id).to.eq(res.donationId);
          expect(donator.length).to.eql(1);
          expect(donator[0]._id).to.eq(res.donatorId);
        });
    });
  });

  describe("When body is missing required param (birthDate) from donator", () => {
    it("Returns bad request", () => {
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
      chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/donations/charge-credit-card")
        .send(chargeInfo)
        .end(async (_err, res) => {
          const donation = await Donation.Model.find();
          const donator = await Donator.Model.find();

          res.should.have.status(400);
          expect(res.error.text).to.include("birthDate");
          expect(donation.length).to.eql(0);
          expect(donator.length).to.eql(0);
        });
    });
  });

  describe("When body is missing required param (donatedValue) from donation", () => {
    it("Returns bad request", () => {
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
      chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/donations/charge-credit-card")
        .send(chargeInfo)
        .end(async (_err, res) => {
          const donation = await Donation.Model.find();
          const donator = await Donator.Model.find();

          res.should.have.status(400);
          expect(res.error.text).to.include("donatedValue");
          expect(donation.length).to.eql(0);
          expect(donator.length).to.eql(0);
        });
    });
  });

  describe("When body is missing required param from both donator and donation", () => {
    it("Returns bad request", () => {
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
      chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/donations/charge-credit-card")
        .send(chargeInfo)
        .end(async (_err, res) => {
          const donation = await Donation.Model.find();
          const donator = await Donator.Model.find();

          res.should.have.status(400);
          expect(res.error.text).to.include("birthDate");
          expect(res.error.text).to.include("donatedValue");
          expect(donation.length).to.eql(0);
          expect(donator.length).to.eql(0);
        });
    });
  });

  describe("When credit card is invalid", () => {
    it("Returns internal server error", () => {
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
      chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/donations/charge-credit-card")
        .send(chargeInfo)
        .end(async (_err, res) => {
          const donation = await Donation.Model.find();
          const donator = await Donator.Model.find();

          res.should.have.status(500);
          expect(donation.length).to.eql(0);
          expect(donator.length).to.eql(0);
        });
    });
  });

  after((done) => {
    mongoose.connection.dropDatabase(process.env.TEST_DB);
    done();
  });
});

describe("/POST Charge boleto", () => {
  beforeEach(async () => {
    await Donation.Model.remove({});
    await Donator.Model.remove({});
  });

  describe("When body is missing required param (birthDate) from donator", () => {
    it("Returns bad request", () => {
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
        cpf: 99176560066,
        postalCode: 76820320,
        street: "Rua das Casas",
        number: 100,
        neighborhood: "Bairro qualquer",
      };
      chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/donations/charge-boleto")
        .send(chargeInfo)
        .end(async (_err, res) => {
          const donation = await Donation.Model.find();
          const donator = await Donator.Model.find();

          res.should.have.status(400);
          expect(res.error.text).to.include("birthDate");
          expect(donation.length).to.eql(0);
          expect(donator.length).to.eql(0);
        });
    });
  });

  describe("When body is missing required param (donatedValue) from donation", () => {
    it("Returns bad request", () => {
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
        cpf: 99176560066,
        postalCode: 76820320,
        street: "Rua das Casas",
        number: 100,
        neighborhood: "Bairro qualquer",
      };
      chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/donations/charge-boleto")
        .send(chargeInfo)
        .end(async (_err, res) => {
          const donation = await Donation.Model.find();
          const donator = await Donator.Model.find();

          res.should.have.status(400);
          expect(res.error.text).to.include("donatedValue");
          expect(donation.length).to.eql(0);
          expect(donator.length).to.eql(0);
        });
    });
  });

  describe("When body is missing required param from both donator and donation", () => {
    it("Returns bad request", () => {
      it("Returns bad request", () => {
        const chargeInfo = {
          name: "Example Name",
          occupation: "Software Engineer",
          motivation: "Any reason here",
          city: "São Paulo",
          state: "SP",
          country: "Brazil",
          email: "example@test.com",
          phone: 5511999999999,
          cpf: 99176560066,
          postalCode: 76820320,
          street: "Rua das Casas",
          number: 100,
          neighborhood: "Bairro qualquer",
        };
        chai
          .request(`http://localhost:${process.env.TEST_PORT}`)
          .post("/api/donations/charge-boleto")
          .send(chargeInfo)
          .end(async (_err, res) => {
            const donation = await Donation.Model.find();
            const donator = await Donator.Model.find();

            res.should.have.status(400);
            expect(res.error.text).to.include("birthDate");
            expect(res.error.text).to.include("donatedValue");
            expect(donation.length).to.eql(0);
            expect(donator.length).to.eql(0);
          });
      });
    });

    after((done) => {
      mongoose.connection.dropDatabase(process.env.TEST_DB);
      done();
    });
  });
});
