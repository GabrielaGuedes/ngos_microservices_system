const Interactor = require("interactor");
const Employee = require("../models/employees");

module.exports = class CreateEmployee extends Interactor {
  // eslint-disable-next-line class-methods-use-this
  async run(context) {
    return Employee.Model.create(context.employeeInfo)
      .then((result) => {
        context.employee = result;
      })
      .catch((err) => {
        context.error = err;
        return Promise.reject(err);
      });
  }

  async rollback() {
    if (this.context.employee) {
      await Employee.Model.destroy({
        where: {
          id: this.context.employee.id,
        },
      });
    }
  }
};
