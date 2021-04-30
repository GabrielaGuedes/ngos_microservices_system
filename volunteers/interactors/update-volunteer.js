const Interactor = require("interactor");

module.exports = class UpdateVolunteer extends Interactor {
  // eslint-disable-next-line class-methods-use-this
  async run(context) {
    return context.volunteer
      .update(context.volunteerInfo)
      .then((result) => {
        context.volunteer = result;
      })
      .catch((err) => {
        context.error = err;
        return Promise.reject(err);
      });
  }
};
