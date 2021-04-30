const Interactor = require("interactor");
const CreateTeam = require("./create-team");
const SetVolunteersForTeam = require("./set-volunteers-for-team");

module.exports = class CreateTeamOrganizer extends Interactor {
  // eslint-disable-next-line class-methods-use-this
  organize() {
    return [CreateTeam, SetVolunteersForTeam];
  }
};
