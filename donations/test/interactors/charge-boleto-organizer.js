/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const mongoose = require("mongoose");
const chai = require("chai");
const ChargeBoletoOrganizer = require("../../interactors/charge-boleto-organizer");
const Donation = require("../../models/donations");
const Donator = require("../../models/donators");
require("../../config/db");

const { expect } = chai;

describe("ChargeBoletoOrganizer", () => {
  beforeEach(async () => {
    await Donation.Model.remove({});
    await Donator.Model.remove({});
  });

  describe("When cant charge the boleto", () => {
    it("Doesnt create the donation nor the donator", () => {
      const context = {
        chargeInfo: {
          donatedValue: 20.0,
          name: "Jose da Silva",
          email: "example@test.com",
          cpf: 99176560066,
          country: "Brazil",
          state: "SP",
          city: "Sao Paulo",
          postalCode: 76820320,
          street: "Rua das Casas",
          number: 100,
          neighborhood: "Bairro qualquer",
        },
        donatorInfo: {
          name: "Jose da Silva",
          birthDate: "1990-01-01T20:20:39+00:00",
          motivation: "Any reason here",
          occupation: "Software Engineer",
          city: "Sao Paulo",
          state: "SP",
          country: "Brazil",
          email: "example@test.com",
          phone: 5511999999999,
        },
        source: "BOLETO",
      };

      return ChargeBoletoOrganizer.run(context).catch(async (err) => {
        const donation = await Donation.Model.find();
        const donator = await Donator.Model.find();

        expect(donation).to.eql([]);
        expect(donator).to.eql([]);
        expect(err).to.eq(undefined);
      });
    });
  });

  after((done) => {
    mongoose.connection.dropDatabase(process.env.TEST_DB);
    done();
  });
});
