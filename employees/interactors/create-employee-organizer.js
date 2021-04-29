const Interactor = require("interactor");
const CreateEmployee = require("./create-employee");
const AddAreas = require("./add-areas");
const AddTeams = require("./add-teams");

module.exports = class CreateEmployeeOrganizer extends Interactor {
  // eslint-disable-next-line class-methods-use-this
  organize() {
    return [CreateEmployee, AddAreas, AddTeams];
  }
};
