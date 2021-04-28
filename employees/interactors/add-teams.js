const Interactor = require("interactor");

module.exports = class AddTeams extends Interactor {
  async run(context) {
    return this.context.employee
      .addTeams(context.teamIds)
      .then(() => {
        context.employee.dataValues.teamIds = context.teamIds;
      })
      .catch((error) => {
        context.error = error;
        return Promise.reject(error);
      });
  }

  async rollback() {
    await this.context.employee.removeTeams(this.context.teamIds);
  }
};
