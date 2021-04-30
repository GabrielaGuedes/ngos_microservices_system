const Interactor = require("interactor");
const employees = require("../models/employees");

module.exports = class DestroyEmployee extends Interactor {
  async run(context) {
    return employees.Model.destroy({ where: { id: this.context.id } })
      .then(() => {
        context.success = true;
      })
      .catch((error) => {
        context.error = error;
        return Promise.reject(error);
      });
  }
};
