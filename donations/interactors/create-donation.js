const Interactor = require("interactor");
const Donation = require("../models/donations");

module.exports = class CreateDonation extends Interactor {
  async run(context) {
    this.context = context;
    this.donation = new Donation.Model({
      donationId: context.donationId,
      status: context.status,
      amount: context.chargeInfo.donatedValue,
      donatorEmail: context.donatorInfo.email,
      source: context.source,
    });

    await this.donation
      .save()
      .then((result) => {
        // eslint-disable-next-line no-underscore-dangle
        context.donationRecordId = result._id;
      })
      .catch((err) => err);
  }

  rollback() {
    console.log("rollbackkkkkkkkkkkkkkkkkkkk");
    Donation.Model.findOneAndRemove({ donationId: this.context.id });
  }
};
