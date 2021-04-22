/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require("chai");
const ChargeCreditCard = require("../../interactors/charge-credit-card");

const { expect } = chai;

describe("ChargeCreditCard", () => {
  const validContext = {
    chargeInfo: {
      creditCardNumber: 4111111111111111,
      cvv: 123,
      expireMonth: "12",
      expireYear: "2030",
      donatedValue: 25.0,
      name: "Jose da Silva",
    },
  };

  const invalidContext = {
    chargeInfo: {
      creditCardNumber: 4222222222222222,
      cvv: 123,
      expireMonth: "12",
      expireYear: "2030",
      donatedValue: 25.0,
      name: "Jose da Silva",
    },
  };

  it("Charges the credit card when context passed is valid", () =>
    ChargeCreditCard.run(validContext).then((res) => {
      expect(res).to.have.own.property("status");
      expect(res).to.have.own.property("donationId");
      expect(res.status).to.eq("PAID");
    }));

  it("Does not charge the credit card when context passed is invalid", () =>
    ChargeCreditCard.run(invalidContext).catch((err) => {
      expect(err).to.eq(undefined);
    }));
});
