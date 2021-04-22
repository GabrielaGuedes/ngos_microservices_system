const Interactor = require("interactor");
const Donator = require("../models/donators");

module.exports = class CreateDonator extends Interactor {
  async run(context) {
    this.donator = new Donator.Model();

    const data = {
      name: context.donatorInfo.name,
      birthDate: context.donatorInfo.birthDate,
      motivation: context.donatorInfo.motivation,
      occupation: context.donatorInfo.occupation,
      city: context.donatorInfo.city,
      state: context.donatorInfo.state,
      country: context.donatorInfo.country,
      email: context.donatorInfo.email,
      phone: context.donatorInfo.phone,
      $inc: {
        donatedValue: context.chargeInfo.donatedValue,
      },
    };

    await Donator.Model.findOneAndUpdate(
      { email: context.donatorInfo.email },
      data,
      {
        upsert: true,
        useFindAndModify: false,
        returnOriginal: false,
        runValidators: true,
        context: "query",
      }
    )
      .then(async (result) => {
        // eslint-disable-next-line no-underscore-dangle
        context.donatorRecordId = result._id;
      })
      .catch((err) => err);
  }
};
