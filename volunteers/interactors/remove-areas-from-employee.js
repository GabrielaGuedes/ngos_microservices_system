const Interactor = require("interactor");
const employees = require("../models/employees");

module.exports = class RemoveAreasFromEmployee extends Interactor {
  async run(context) {
    await this.saveEmployee();
    await this.saveOldAreaIds();

    return this.employee
      .setAreas([])
      .then(() => {
        context.areaIds = [];
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

  async saveOldAreaIds() {
    this.oldAreaIds = this.employee.areas
      ? this.employee.areas.map((area) => area.id)
      : [];
  }

  async rollback() {
    await this.employee.addAreas(this.oldAreaIds);
  }
};
