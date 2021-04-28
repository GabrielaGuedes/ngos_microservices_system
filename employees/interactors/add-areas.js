const Interactor = require("interactor");

module.exports = class AddAreas extends Interactor {
  async run(context) {
    return this.context.employee
      .addAreas(context.areaIds)
      .then(() => {
        context.employee.dataValues.areaIds = context.areaIds;
      })
      .catch((error) => {
        context.error = error;
        return Promise.reject(error);
      });
  }

  async rollback() {
    await this.context.employee.removeAreas(this.context.areaIds);
  }
};
