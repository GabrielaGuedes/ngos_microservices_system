const Interactor = require("interactor");
const areas = require("../models/areas");

module.exports = class RemoveEmployeesFromArea extends Interactor {
  async run(context) {
    await this.saveArea();
    await this.saveOldEmployeeIds();

    return this.area
      .setEmployees([])
      .then(() => {
        context.employeeIds = [];
      })
      .catch((error) => {
        context.error = error;
        return Promise.reject(error);
      });
  }

  async saveArea() {
    this.area = await areas.Model.findOne({
      where: { id: this.context.id },
    });
  }

  async saveOldEmployeeIds() {
    this.oldEmployeeIds = this.area.employees
      ? this.area.employees.map((employee) => employee.id)
      : [];
  }

  async rollback() {
    await this.area.addEmployees(this.oldEmployeeIds);
  }
};
