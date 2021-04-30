const Interactor = require("interactor");
const employees = require("../models/employees");

module.exports = class RemoveTeamsFromEmployee extends Interactor {
  async run(context) {
    await this.saveEmployee();
    await this.saveOldTeamIds();

    return this.employee
      .setTeams([])
      .then(() => {
        context.teamIds = [];
      })
      .catch((error) => {
        context.error = error;
        return Promise.reject(error);
      });
  }

  async saveEmployee() {
    this.employee = await employees.Model.findOne({
      where: { id: this.context.id },
    });
  }

  async saveOldTeamIds() {
    this.oldTeamIds = this.employee.teams
      ? this.employee.teams.map((team) => team.id)
      : [];
  }

  async rollback() {
    await this.employee.addTeams(this.oldTeamIds);
  }
};
