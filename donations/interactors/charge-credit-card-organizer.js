const Interactor = require("interactor");
const ChargeCreditCard = require("./charge-credit-card");
const CreateDonation = require("./create-donation");
const CreateDonator = require("./create-donator");
const CreateTransaction = require("./create-transaction");

module.exports = class ChargeCreditCardOrganizer extends Interactor {
  // eslint-disable-next-line class-methods-use-this
  organize() {
    return [ChargeCreditCard, CreateDonation, CreateTransaction, CreateDonator];
  }
};
