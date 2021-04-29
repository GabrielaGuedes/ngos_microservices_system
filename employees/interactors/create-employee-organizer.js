const Interactor = require("interactor");
const CreateEmployee = require("./create-employee");
const SetAreas = require("./set-areas");
const SetTeams = require("./set-teams");

module.exports = class CreateEmployeeOrganizer extends Interactor {
  // eslint-disable-next-line class-methods-use-this
  organize() {
    return [CreateEmployee, SetAreas, SetTeams];
  }
};
