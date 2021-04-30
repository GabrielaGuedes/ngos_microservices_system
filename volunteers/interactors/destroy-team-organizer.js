const Interactor = require("interactor");
const DestroyTeam = require("./destroy-team");
const RemoveVolunteersFromTeam = require("./remove-volunteers-from-team");

module.exports = class DestroyTeamOrganizer extends Interactor {
  // eslint-disable-next-line class-methods-use-this
  organize() {
    return [RemoveVolunteersFromTeam, DestroyTeam];
  }
};
