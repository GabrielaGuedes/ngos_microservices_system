const Interactor = require("interactor");
const volunteers = require("../models/volunteers");

module.exports = class RemoveTeamsFromVolunteer extends Interactor {
  async run(context) {
    await this.saveVolunteer();
    await this.saveOldTeamIds();

    return this.volunteer
      .setTeams([])
      .then(() => {
        context.teamIds = [];
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

  async saveOldTeamIds() {
    this.oldTeamIds = this.volunteer.teams
      ? this.volunteer.teams.map((team) => team.id)
      : [];
  }

  async rollback() {
    await this.volunteer.addTeams(this.oldTeamIds);
  }
};
