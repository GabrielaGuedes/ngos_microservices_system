const Interactor = require("interactor");
const areas = require("../models/areas");

module.exports = class RemoveVolunteersFromArea extends Interactor {
  async run(context) {
    await this.saveArea();
    await this.saveOldVolunteerIds();

    return this.area
      .setVolunteers([])
      .then(() => {
        context.volunteerIds = [];
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

  async saveOldVolunteerIds() {
    this.oldVolunteerIds = this.area.volunteers
      ? this.area.volunteers.map((volunteer) => volunteer.id)
      : [];
  }

  async rollback() {
    await this.area.addVolunteers(this.oldVolunteerIds);
  }
};
