const Interactor = require("interactor");
const ChargeBoleto = require("./charge-boleto");
const CreateDonation = require("./create-donation");
const CreateDonator = require("./create-donator");

module.exports = class ChargeBoletoOrganizer extends Interactor {
  // eslint-disable-next-line class-methods-use-this
  organize() {
    return [ChargeBoleto, CreateDonation, CreateDonator];
  }
};
