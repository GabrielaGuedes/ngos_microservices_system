const Interactor = require("interactor");
const teams = require("../models/teams");

module.exports = class RemoveVolunteersFromTeam extends Interactor {
  async run(context) {
    await this.saveTeam();
    await this.saveOldVolunteerIds();

    return this.team
      .setVolunteers([])
      .then(() => {
        context.volunteerIds = [];
      })
      .catch((error) => {
        context.error = error;
        return Promise.reject(error);
      });
  }

  async saveTeam() {
    this.team = await teams.Model.findOne({
      where: { id: this.context.id },
    });
  }

  async saveOldVolunteerIds() {
    this.oldVolunteerIds = this.team.volunteers
      ? this.team.volunteers.map((volunteer) => volunteer.id)
      : [];
  }

  async rollback() {
    await this.team.addVolunteers(this.oldVolunteerIds);
  }
};
