const Interactor = require("interactor");
const volunteers = require("../models/volunteers");

module.exports = class RemoveAreasFromVolunteer extends Interactor {
  async run(context) {
    await this.saveVolunteer();
    await this.saveOldAreaIds();

    return this.volunteer
      .setAreas([])
      .then(() => {
        context.areaIds = [];
      })
      .catch((error) => {
        context.error = error;
        return Promise.reject(error);
      });
  }

  async saveVolunteer() {
    this.volunteer = await volunteers.Model.findOne({
      where: { id: this.context.id },
    });
  }

  async saveOldAreaIds() {
    this.oldAreaIds = this.volunteer.areas
      ? this.volunteer.areas.map((area) => area.id)
      : [];
  }

  async rollback() {
    await this.volunteer.addAreas(this.oldAreaIds);
  }
};
