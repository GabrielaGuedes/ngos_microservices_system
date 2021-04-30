const Interactor = require("interactor");
const DestroyTeam = require("./destroy-team");
const RemoveEmployeesFromTeam = require("./remove-employees-from-team");

module.exports = class DestroyTeamOrganizer extends Interactor {
  // eslint-disable-next-line class-methods-use-this
  organize() {
    return [RemoveEmployeesFromTeam, DestroyTeam];
  }
};
