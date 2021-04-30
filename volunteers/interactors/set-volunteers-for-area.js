const Interactor = require("interactor");

module.exports = class SetVolunteersForArea extends Interactor {
  async run(context) {
    const oldVolunteers = await context.area.getVolunteers();
    this.oldVolunteerIds = oldVolunteers.map((vol) => vol.id);

    return this.context.area
      .setVolunteers(context.volunteerIds)
      .then(() => {
        context.area.dataValues.volunteerIds = context.volunteerIds;
      })
      .catch((error) => {
        context.error = error;
        return Promise.reject(error);
      });
  }

  async rollback() {
    await this.context.area.setVolunteers(this.oldVolunteerIds);
  }
};
