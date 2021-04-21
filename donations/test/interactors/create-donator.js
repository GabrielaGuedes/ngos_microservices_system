/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const mongoose = require("mongoose");
const chai = require("chai");
const CreateDonator = require("../../interactors/create-donator");
const Donator = require("../../models/donators");
require("dotenv/config");
require("../../config/db");

const { expect } = chai;

describe("CreateDonator", () => {
  it("Creates a donator when context passed is correct", async () => {
    const context = {
      chargeInfo: {
        donatedValue: 25.0,
      },
      donatorInfo: {
        name: "Example Name",
        birthDate: "1990-01-01",
        motivation: "Any reason here",
        occupation: "Software Engineer",
        city: "Sao Paulo",
        state: "SP",
        country: "Brazil",
        email: "test@example.com",
        phone: 5511999999999,
      },
    };

    return CreateDonator.run(context).then(async (res) => {
      const donator = await Donator.Model.findOne({
        email: context.donatorInfo.email,
      });
      expect(res).to.have.own.property("donatorRecordId");
      expect(donator.donatedValue).to.eq(context.chargeInfo.donatedValue);
    });
  });

  describe("Create donator with repeated email", () => {
    before(() => {
      const context = {
        chargeInfo: {
          donatedValue: 25.0,
        },
        donatorInfo: {
          name: "Example Name",
          birthDate: "1990-01-01",
          motivation: "Any reason here",
          occupation: "Software Engineer",
          city: "Sao Paulo",
          state: "SP",
          country: "Brazil",
          email: "test2@example.com",
          phone: 5511999999999,
        },
      };

      return CreateDonator.run(context).then((res) => {
        expect(res).to.have.own.property("donatorRecordId");
      });
    });

    it("Updates the record with the new data", async () => {
      const context = {
        chargeInfo: {
          donatedValue: 25.0,
        },
        donatorInfo: {
          name: "New Example Name",
          birthDate: "1990-01-01",
          motivation: "Any other reason here",
          occupation: "Student",
          city: "Sao Paulo",
          state: "SP",
          country: "Brazil",
          email: "test2@example.com",
          phone: 5511999999999,
        },
      };

      return CreateDonator.run(context).then(async (res) => {
        const donator = await Donator.Model.findOne({
          email: context.donatorInfo.email,
        });
        expect(res).to.have.own.property("donatorRecordId");
        expect(donator.motivation).to.eq(context.donatorInfo.motivation);
        expect(donator.occupation).to.eq(context.donatorInfo.occupation);
        expect(donator.name).to.eq(context.donatorInfo.name);
        expect(donator.donatedValue).to.eq(context.chargeInfo.donatedValue * 2);
      });
    });
  });
});

after((done) => {
  mongoose.connection.dropDatabase(process.env.TEST_DB);
  done();
});
