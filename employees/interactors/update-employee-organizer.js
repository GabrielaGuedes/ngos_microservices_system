const Interactor = require("interactor");
const UpdateEmployee = require("./update-employee");
const SetAreas = require("./set-areas");
const SetTeams = require("./set-teams");

module.exports = class UpdateEmployeeOrganizer extends Interactor {
  // eslint-disable-next-line class-methods-use-this
  organize() {
    return [UpdateEmployee, SetAreas, SetTeams];
  }
};
