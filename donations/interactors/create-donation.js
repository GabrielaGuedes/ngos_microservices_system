/* eslint-disable no-underscore-dangle */
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
        context.donationRecordId = result._id;
      })
      .catch(async (err) => {
        await this.saveDonationRecordId();
        return Promise.reject(err);
      });
  }

  async saveDonationRecordId() {
    const donation = await Donation.Model.findOne({
      donationId: this.context.donationId,
    });
    this.donationRecordId = donation ? donation._id : null;
  }

  async rollback() {
    await Donation.Model.findOneAndRemove({
      _id: this.context.donationRecordId,
    });
  }
};
