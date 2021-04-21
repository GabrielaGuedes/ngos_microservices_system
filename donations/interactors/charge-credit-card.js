const Interactor = require("interactor");
const { creditCardBody } = require("../external-requests-body/credit-card");
const formatDonatedValue = require("../utils/format-donated-value");
const { charge } = require("../utils/request-charge");
const CancelCharge = require("./cancel-charge");

module.exports = class ChargeCreditCard extends Interactor {
  async run(context) {
    const result = await this.getChargeResult(context);
    const jsonResult = await result.json();

    if (result.status === 200 || result.status === 201) {
      this.id = jsonResult.id;
      context.donationId = jsonResult.id;
      context.status = jsonResult.status;
      return Promise.resolve();
    }

    return Promise.reject();
  }

  getChargeResult(context) {
    this.body = creditCardBody(
      context.chargeInfo.creditCardNumber,
      context.chargeInfo.cvv,
      context.chargeInfo.donatedValue,
      context.chargeInfo.expireMonth,
      context.chargeInfo.expireYear,
      context.chargeInfo.name
    );

    return charge(this.body);
  }

  async rollback() {
    this.cancelBody = {
      amount: {
        value: formatDonatedValue(this.context.chargeInfo.donatedValue),
      },
    };
    await CancelCharge.run({ chargeId: this.id, body: this.cancelBody });
  }
};
