const Interactor = require("interactor");
const teams = require("../models/teams");

module.exports = class RemoveEmployeesFromTeam extends Interactor {
  async run(context) {
    await this.saveTeam();
    await this.saveOldEmployeeIds();

    return this.team
      .setEmployees([])
      .then(() => {
        context.employeeIds = [];
      })
      .catch((error) => {
        context.error = error;
        return Promise.reject(error);
      });
  }

  async saveTeam() {
    this.team = await teams.Model.findOne({
      where: { id: this.context.id },
    });
  }

  async saveOldEmployeeIds() {
    this.oldEmployeeIds = this.team.employees
      ? this.team.employees.map((employee) => employee.id)
      : [];
  }

  async rollback() {
    await this.team.addEmployees(this.oldEmployeeIds);
  }
};
