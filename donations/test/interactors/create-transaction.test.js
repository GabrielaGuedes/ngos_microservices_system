/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
process.env.LOGIN_URL = `http://localhost:${process.env.AUTHENTICATION_PORT}/api/login`;
process.env.FINANCIAL_TRANSACTIONS_URL = `http://localhost:${process.env.FINANCIAL_PORT}/api/transactions`;
process.env.SERVICES_SETTINGS_URL = `http://localhost:${process.env.SETTINGS_PORT}/api/services`;
const mongoose = require("mongoose");
const chai = require("chai");
const CreateTransaction = require("../../interactors/create-transaction");
const Donation = require("../../models/donations");
const Donator = require("../../models/donators");
const { authorizedRequest } = require("../../utils/requests");
require("../../config/db");

const { expect } = chai;

describe("CreateTransaction", () => {
  it("Creates the transaction if financial server is enabled", async () => {
    const context = {
      chargeInfo: {
        donatedValue: 10.0,
      },
    };

    return CreateTransaction.run(context).then(async (res) => {
      expect(res).to.have.own.property("transactionId");
      expect(res).to.not.eq(null);
    });
  });

  describe("When financial server is disabled", () => {
    before(async () => {
      await authorizedRequest(process.env.SERVICES_SETTINGS_URL, "POST", {
        financialControl: false,
      });
    });

    it("Doesnt create the transaction", () => {
      const context = {
        chargeInfo: {
          donatedValue: 10.0,
        },
      };

      return CreateTransaction.run(context).then(async (res) => {
        expect(res).to.not.have.own.property("transactionId");
      });
    });

    after(async () => {
      await authorizedRequest(process.env.SERVICES_SETTINGS_URL, "POST", {
        financialControl: true,
      });
    });
  });
});
