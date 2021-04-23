/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require("chai");
const ChargeBoleto = require("../../interactors/charge-credit-card");

const { expect } = chai;

describe("ChargeBoleto", () => {
  const invalidContext = {
    chargeInfo: {
      donatedValue: 20.0,
      name: "Jose da Silva",
      email: "example@test.com",
      country: "Brazil",
      state: "SP",
      city: "Sao Paulo",
      postalCode: 76820320,
      street: "Rua das Casas",
      number: 100,
      neighborhood: "Bairro qualquer",
    },
  };

  it("Does not charge the boleto when context passed is invalid (without cpf)", () =>
    ChargeBoleto.run(invalidContext).catch((err) => {
      expect(err).to.eq(undefined);
    }));
});
