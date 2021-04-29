const Interactor = require("interactor");

module.exports = class SetEmployeesForArea extends Interactor {
  async run(context) {
    const oldEmployees = await context.area.getEmployees();
    this.oldEmployeeIds = oldEmployees.map((emp) => emp.id);

    return this.context.area
      .setEmployees(context.employeeIds)
      .then(() => {
        context.area.dataValues.employeeIds = context.employeeIds;
      })
      .catch((error) => {
        context.error = error;
        return Promise.reject(error);
      });
  }

  async rollback() {
    await this.context.area.setEmployees(this.oldEmployeeIds);
  }
};
