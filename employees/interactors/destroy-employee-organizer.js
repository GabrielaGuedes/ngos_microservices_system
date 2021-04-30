const Interactor = require("interactor");
const DestroyEmployee = require("./destroy-employee");
const RemoveAreasFromEmployee = require("./remove-areas-from-employee");
const RemoveTeamsFromEmployee = require("./remove-teams-from-employee");

module.exports = class DestroyEmployeeOrganizer extends Interactor {
  // eslint-disable-next-line class-methods-use-this
  organize() {
    return [RemoveAreasFromEmployee, RemoveTeamsFromEmployee, DestroyEmployee];
  }
};
