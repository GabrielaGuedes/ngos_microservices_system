const Interactor = require("interactor");

module.exports = class SetAreas extends Interactor {
  async run(context) {
    const oldAreas = await context.volunteer.getAreas();
    this.oldAreaIds = oldAreas.map((area) => area.id);

    return this.context.volunteer
      .setAreas(context.areaIds)
      .then(() => {
        context.volunteer.dataValues.areaIds = context.areaIds;
      })
      .catch((error) => {
        context.error = error;
        return Promise.reject(error);
      });
  }

  async rollback() {
    await this.context.volunteer.setAreas(this.oldAreaIds);
  }
};
