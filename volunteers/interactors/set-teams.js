const Interactor = require("interactor");

module.exports = class SetTeams extends Interactor {
  async run(context) {
    const oldTeams = await context.volunteer.getTeams();
    this.oldTeamIds = oldTeams.map((area) => area.id);

    return this.context.volunteer
      .setTeams(context.teamIds)
      .then(() => {
        context.volunteer.dataValues.teamIds = context.teamIds;
      })
      .catch((error) => {
        context.error = error;
        return Promise.reject(error);
      });
  }

  async rollback() {
    await this.context.volunteer.setTeams(this.oldTeamIds);
  }
};
