const Interactor = require("interactor");

module.exports = class SetVolunteersForTeam extends Interactor {
  async run(context) {
    const oldVolunteers = await context.team.getVolunteers();
    this.oldVolunteerIds = oldVolunteers.map((vol) => vol.id);

    return this.context.team
      .setVolunteers(context.volunteerIds)
      .then(() => {
        context.team.dataValues.volunteerIds = context.volunteerIds;
      })
      .catch((error) => {
        context.error = error;
        return Promise.reject(error);
      });
  }

  async rollback() {
    await this.context.team.setVolunteers(this.oldVolunteerIds);
  }
};
