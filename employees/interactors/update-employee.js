const Interactor = require("interactor");

module.exports = class UpdateEmployee extends Interactor {
  // eslint-disable-next-line class-methods-use-this
  async run(context) {
    return context.employee
      .update(context.employeeInfo)
      .then((result) => {
        context.employee = result;
      })
      .catch((err) => {
        context.error = err;
        return Promise.reject(err);
      });
  }
};
