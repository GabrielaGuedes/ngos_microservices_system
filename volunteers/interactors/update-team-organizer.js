const Interactor = require("interactor");
const UpdateTeam = require("./update-team");
const SetEmployeesForTeam = require("./set-employees-for-team");

module.exports = class UpdateTeamOrganizer extends Interactor {
  // eslint-disable-next-line class-methods-use-this
  organize() {
    return [UpdateTeam, SetEmployeesForTeam];
  }
};
