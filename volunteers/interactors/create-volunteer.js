const Interactor = require("interactor");
const Volunteer = require("../models/volunteers");

module.exports = class CreateVolunteer extends Interactor {
  // eslint-disable-next-line class-methods-use-this
  async run(context) {
    return Volunteer.Model.create(context.volunteerInfo)
      .then((result) => {
        context.volunteer = result;
      })
      .catch((err) => {
        context.error = err;
        return Promise.reject(err);
      });
  }

  async rollback() {
    if (this.context.volunteer) {
      await Volunteer.Model.destroy({
        where: {
          id: this.context.volunteer.id,
        },
      });
    }
  }
};
