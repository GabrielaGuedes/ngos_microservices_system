/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
process.env.LOGIN_URL = `http://localhost:${process.env.AUTHENTICATION_PORT}/api/login`;
process.env.FINANCIAL_TRANSACTIONS_URL = `http://localhost:${process.env.FINANCIAL_PORT}/api/transactions`;
process.env.SERVICES_SETTINGS_URL = `http://localhost:${process.env.SETTINGS_PORT}/api/services`;
const mongoose = require("mongoose");
const chai = require("chai");
const ChargeCreditCardOrganizer = require("../../interactors/charge-credit-card-organizer");
const Donation = require("../../models/donations");
const Donator = require("../../models/donators");
require("../../config/db");

const { expect } = chai;

describe("ChargeCreditCardOrganizer", () => {
  beforeEach(async () => {
    await Donation.Model.remove({});
    await Donator.Model.remove({});
  });

  it("Charges the credit card, create the donation and the donator if everything is fine", async () => {
    const context = {
      chargeInfo: {
        creditCardNumber: 4111111111111111,
        cvv: 123,
        donatedValue: 10.0,
        expireMonth: "12",
        expireYear: "2030",
        name: "Jose da Silva",
      },
      donatorInfo: {
        name: "Jose da Silva",
        birthDate: "1990-01-01",
        motivation: "Any reason here",
        occupation: "Software Engineer",
        city: "Sao Paulo",
        state: "SP",
        country: "Brazil",
        email: "example@example.com",
        phone: 5511999999999,
      },
      source: "CREDIT_CARD",
    };

    return ChargeCreditCardOrganizer.run(context).then(async (res) => {
      expect(res).to.have.own.property("donationRecordId");
      expect(res).to.have.own.property("donatorRecordId");
      expect(res).to.have.own.property("donationId");
      expect(res).to.have.own.property("status");
      expect(res.status).to.eq("PAID");
    });
  });

  describe("When cant charge the credit card", () => {
    it("Doesnt create the donation nor the donator", () => {
      const context = {
        chargeInfo: {
          creditCardNumber: 4222222222222222,
          cvv: 123,
          donatedValue: 10.0,
          expireMonth: "12",
          expireYear: "2030",
          name: "Jose da Silva",
        },
        donatorInfo: {
          name: "Jose da Silva",
          birthDate: "1990-01-01",
          motivation: "Any reason here",
          occupation: "Software Engineer",
          city: "Sao Paulo",
          state: "SP",
          country: "Brazil",
          email: "example@example.com",
          phone: 5511999999999,
        },
        source: "CREDIT_CARD",
      };

      return ChargeCreditCardOrganizer.run(context)
        .then(async (res) => {})
        .catch(async (err) => {
          const donation = await Donation.Model.find();
          const donator = await Donator.Model.find();

          expect(donation).to.eql([]);
          expect(donator).to.eql([]);
          expect(err).to.eq(undefined);
        });
    });
  });

  describe("When cant create the donator", () => {
    it("Rollbacks the donation and the credit card charge", async () => {
      const context = {
        chargeInfo: {
          creditCardNumber: 4111111111111111,
          cvv: 123,
          donatedValue: 10.0,
          expireMonth: "12",
          expireYear: "2030",
          name: "Jose da Silva",
        },
        donatorInfo: {
          name: "Jose da Silva",
          motivation: "Any reason here",
          occupation: "Software Engineer",
          city: "Sao Paulo",
          state: "SP",
          country: "Brazil",
          email: "example@example.com",
          phone: 5511999999999,
        },
        source: "CREDIT_CARD",
      };

      return ChargeCreditCardOrganizer.run(context).catch(async () => {
        const donation = await Donation.Model.find();
        const donator = await Donator.Model.find();

        expect(donation).to.eql([]);
        expect(donator).to.eql([]);
      });
    });
  });

  after((done) => {
    mongoose.connection.dropDatabase(process.env.TEST_DB);
    done();
  });
});
