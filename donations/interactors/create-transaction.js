const Interactor = require("interactor");
const { authorizedRequest } = require("../utils/requests");

module.exports = class CreateTransaction extends Interactor {
  async run(context) {
    if (await this.hasFinancialControlService()) {
      return this.createTransaction()
        .then((result) => {
          if (result.status === 200) {
            return result.json();
          }
          return Promise.reject();
        })
        .then((result) => {
          context.transactionId = result.id;
          return Promise.resolve();
        });
    }
    return Promise.resolve();
  }

  // eslint-disable-next-line class-methods-use-this
  async hasFinancialControlService() {
    return authorizedRequest(process.env.SERVICES_SETTINGS_URL, "GET")
      .then((result) => {
        if (result.status === 200) {
          return result.json();
        }
        return Promise.reject();
      })
      .then((result) => result.financialControl);
  }

  async createTransaction() {
    const body = {
      date: new Date().toISOString().substr(0, 10),
      value: this.context.chargeInfo.donatedValue,
      origin: "Doação",
      kind: "IN",
      recurrent: false,
      description: "Doação feita pelo site",
    };

    return authorizedRequest(
      process.env.FINANCIAL_TRANSACTIONS_URL,
      "POST",
      body
    );
  }

  async rollback() {
    if (this.context.transactionId) {
      await authorizedRequest(
        `${process.env.FINANCIAL_TRANSACTIONS_URL}/${this.context.transactionId}`,
        "DELETE"
      );
    }
  }
};
