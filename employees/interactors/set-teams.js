const Interactor = require("interactor");

module.exports = class SetTeams extends Interactor {
  async run(context) {
    const oldTeams = await context.employee.getTeams();
    this.oldTeamIds = oldTeams.map((area) => area.id);

    return this.context.employee
      .setTeams(context.teamIds)
      .then(() => {
        context.employee.dataValues.teamIds = context.teamIds;
      })
      .catch((error) => {
        context.error = error;
        return Promise.reject(error);
      });
  }

  async rollback() {
    await this.context.employee.setTeams(this.oldTeamIds);
  }
};
