const Interactor = require("interactor");
const UpdateTeam = require("./update-team");
const SetVolunteersForTeam = require("./set-volunteers-for-team");

module.exports = class UpdateTeamOrganizer extends Interactor {
  // eslint-disable-next-line class-methods-use-this
  organize() {
    return [UpdateTeam, SetVolunteersForTeam];
  }
};
