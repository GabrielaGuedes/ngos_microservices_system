const Interactor = require("interactor");
const { boletoBody } = require("../external-requests-body/boleto");
const { charge } = require("../utils/request-charge");

module.exports = class ChargeBoleto extends Interactor {
  async run(context) {
    const result = await this.getChargeResult(context);
    const jsonResult = await result.json();
    this.id = jsonResult.id;

    if (
      (result.status === 200 || result.status === 201) &&
      jsonResult.payment_response.message === "SUCESSO"
    ) {
      context.donationId = jsonResult.id;
      context.status = jsonResult.status;
      context.boletoPdf = jsonResult.links.find(
        (link) => link.media === "application/pdf"
      ).href;
      return Promise.resolve();
    }

    return Promise.reject();
  }

  getChargeResult(context) {
    this.body = boletoBody(
      context.chargeInfo.donatedValue,
      context.chargeInfo.name,
      context.chargeInfo.email,
      context.chargeInfo.cpf,
      context.chargeInfo.country,
      context.chargeInfo.state,
      context.chargeInfo.city,
      context.chargeInfo.postalCode,
      context.chargeInfo.street,
      context.chargeInfo.number,
      context.chargeInfo.neighborhood
    );

    return charge(this.body);
  }
};
