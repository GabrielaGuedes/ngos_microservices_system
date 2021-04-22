const Interactor = require("interactor");
const { cancel } = require("../utils/request-cancel");

module.exports = class CancelCharge extends Interactor {
  async run(context) {
    const result = await this.cancelChargeResult(context);

    if (result.status === 200 || result.status === 201) {
      return Promise.resolve();
    }
    return Promise.reject();
  }

  cancelChargeResult(context) {
    this.body = {
      amount: context.body.amount.value,
    };

    return cancel(context.chargeId, this.body);
  }
};
