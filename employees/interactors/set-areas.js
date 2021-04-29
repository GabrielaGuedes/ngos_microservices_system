const Interactor = require("interactor");

module.exports = class SetAreas extends Interactor {
  async run(context) {
    const oldAreas = await context.employee.getAreas();
    this.oldAreaIds = oldAreas.map((area) => area.id);

    return this.context.employee
      .setAreas(context.areaIds)
      .then(() => {
        context.employee.dataValues.areaIds = context.areaIds;
      })
      .catch((error) => {
        context.error = error;
        return Promise.reject(error);
      });
  }

  async rollback() {
    await this.context.employee.setAreas(this.oldAreaIds);
  }
};
