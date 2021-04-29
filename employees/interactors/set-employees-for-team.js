const Interactor = require("interactor");

module.exports = class SetEmployeesForTeam extends Interactor {
  async run(context) {
    const oldEmployees = await context.team.getEmployees();
    this.oldEmployeeIds = oldEmployees.map((emp) => emp.id);

    return this.context.team
      .setEmployees(context.employeeIds)
      .then(() => {
        context.team.dataValues.employeeIds = context.employeeIds;
      })
      .catch((error) => {
        context.error = error;
        return Promise.reject(error);
      });
  }

  async rollback() {
    await this.context.team.setEmployees(this.oldEmployeeIds);
  }
};
