const Interactor = require("interactor");
const CreateTeam = require("./create-team");
const SetEmployeesForTeam = require("./set-employees-for-team");

module.exports = class CreateTeamOrganizer extends Interactor {
  // eslint-disable-next-line class-methods-use-this
  organize() {
    return [CreateTeam, SetEmployeesForTeam];
  }
};
