/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const mongoose = require("mongoose");
const chai = require("chai");
const CreateDonation = require("../../interactors/create-donation");
require("dotenv/config");
require("../../config/db");

const should = chai.should();
const { expect } = chai;

describe("CreateDonation", () => {
  it("Creates a donation when context passed is correct", async () => {
    const context = {
      donationId: "123123",
      status: "AUTHORIZED",
      chargeInfo: {
        donatedValue: 25.0,
      },
      donatorInfo: {
        email: "test@example.com",
      },
      source: "CREDIT_CARD",
    };

    return CreateDonation.run(context).then(async (res) => {
      expect(res).to.have.own.property("donationRecordId");
    });
  });

  describe("Create donation with repeated id", () => {
    before(() => {
      const context = {
        donationId: "1",
        status: "AUTHORIZED",
        chargeInfo: {
          donatedValue: 25.0,
        },
        donatorInfo: {
          email: "test@example.com",
        },
        source: "CREDIT_CARD",
      };
      return CreateDonation.run(context).then((res) => {
        expect(res).to.have.own.property("donationRecordId");
      });
    });

    it("Throws an error", async () => {
      const context = {
        donationId: "1",
        status: "AUTHORIZED",
        chargeInfo: {
          donatedValue: 25.0,
        },
        donatorInfo: {
          email: "test@example.com",
        },
        source: "CREDIT_CARD",
      };

      return CreateDonation.run(context).then((res) => {
        expect(res).to.not.have.own.property("donationRecordId");
      });
    });
  });
});

after((done) => {
  mongoose.connection.dropDatabase(process.env.TEST_DB);
  done();
});
